using Microsoft.EntityFrameworkCore.Migrations;

namespace Exchanger.Web.Migrations
{
    public partial class CurrencyTypeChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ToCurrency",
                table: "ExchangesHistory",
                type: "varchar(3)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(3)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FromCurrency",
                table: "ExchangesHistory",
                type: "varchar(3)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(3)",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ToCurrency",
                table: "ExchangesHistory",
                type: "varchar(3)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(3)");

            migrationBuilder.AlterColumn<string>(
                name: "FromCurrency",
                table: "ExchangesHistory",
                type: "varchar(3)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(3)");
        }
    }
}
