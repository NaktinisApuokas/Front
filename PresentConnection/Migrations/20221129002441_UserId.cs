using Microsoft.EntityFrameworkCore.Migrations;

namespace FobumCinema.Migrations
{
    public partial class UserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Cinema",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Cinema_UserId",
                table: "Cinema",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cinema_AspNetUsers_UserId",
                table: "Cinema",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cinema_AspNetUsers_UserId",
                table: "Cinema");

            migrationBuilder.DropIndex(
                name: "IX_Cinema_UserId",
                table: "Cinema");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Cinema");
        }
    }
}
