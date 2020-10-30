using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exchanger.Web.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ExchangesHistory",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    FromCurrency = table.Column<string>(type: "varchar(3)", nullable: true),
                    FromAmount = table.Column<decimal>(type: "decimal(12,5)", nullable: false),
                    ToCurrency = table.Column<string>(type: "varchar(3)", nullable: true),
                    ToAmount = table.Column<decimal>(type: "decimal(12,5)", nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ExchangesHistory", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ExchangesHistory");
        }
    }
}
