using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Version = "v1" });
});
builder.Services.AddCors(option => option.AddPolicy("AllowAll",//נתינת שם להרשאה
    p => p.AllowAnyOrigin()//מאפשר כל מקור
    .AllowAnyMethod()//כל מתודה - פונקציה
    .AllowAnyHeader()));//וכל כותרת פונקציה
builder.Services.AddDbContext<ToDoDbContext>(options =>
options.UseMySql(builder.Configuration.GetConnectionString("ToDoDb"),
    new MySqlServerVersion(new Version(8, 0, 41))));

var app = builder.Build();
app.UseCors("AllowAll");
//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}
app.MapGet("/", () => "hello world");

app.MapGet("/getAll", async (ToDoDbContext context) =>
{
    return await context.Items.ToListAsync();
});

app.MapPost("/add", async (ToDoDbContext db,string Name) =>{
    var item = new Item { Name = Name, IsComplete = false }; 
     await db.Items.AddAsync(item);
     await db.SaveChangesAsync();
     return "Item added";
} );

app.MapPatch("/update/{id}", async (ToDoDbContext db, int id,bool IsComplete) => {
    var existingItem = await db.Items.FindAsync(id);
    
    if (existingItem == null)
    {
        return Results.NotFound();
    }
    
        existingItem.IsComplete = IsComplete;
    
    await db.SaveChangesAsync();
    return Results.Ok("Item updated"); 

});

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
