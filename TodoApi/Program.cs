using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

// הוספת קונפיגורציה של Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});

// הוספת קונפיגורציה של CORS עם דומיין ספציפי
builder.Services.AddCors(option => option.AddPolicy("AllowSpecificOrigin", p =>
{
    p.WithOrigins("https://todolistreact-master-vs8d.onrender.com")
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

// הוספת ה-DB Context עם החיבור ל-MySQL
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
        new MySqlServerVersion(new Version(8, 0, 41))));  // שים לב לגרסה כאן

var app = builder.Build();

// הפעלת CORS
app.UseCors("AllowSpecificOrigin");

// הפעלת Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "hello world");

// API לקבלת כל הרשומות
app.MapGet("/getAll", async (ToDoDbContext context) =>
{
    return await context.Items.ToListAsync();
});

// API להוספת פריט חדש
app.MapPost("/add", async (ToDoDbContext db, string Name) =>
{
    var item = new Item { Name = Name, IsComplete = false };
    await db.Items.AddAsync(item);
    await db.SaveChangesAsync();
    return "Item added";
});

// API לעדכון פריט
app.MapPatch("/update/{id}", async (ToDoDbContext db, int id, bool IsComplete) =>
{
    var existingItem = await db.Items.FindAsync(id);

    if (existingItem == null)
    {
        return Results.NotFound();
    }

    existingItem.IsComplete = IsComplete;

    await db.SaveChangesAsync();
    return Results.Ok("Item updated");
});

// API למחיקת פריט
app.MapDelete("/deleteItem/{id}", async (ToDoDbContext context, int id) =>
{
    var existingItem = await context.Items.FindAsync(id);
    if (existingItem != null)
    {
        context.Items.Remove(existingItem);
        await context.SaveChangesAsync();
    }
    return existingItem;
});

app.Run();
