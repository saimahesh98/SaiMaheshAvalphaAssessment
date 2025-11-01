using AvalphaTechnologies.CommissionCalculator.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace AvalphaTechnologies.CommissionCalculator.Tests.Controllers
{
    public class CommisionControllerTests
    {
        [Fact]
        public void Calculate_ValidInput_ReturnsCorrectCommissions()
        {
            var controller = new CommisionController();
            var request = new CommissionCalculationRequest
            {
                LocalSalesCount = 10,
                ForeignSalesCount = 5,
                AverageSaleAmount = 100m
            };

            var result = controller.Calculate(request) as OkObjectResult;
            Assert.NotNull(result);
            var response = result.Value as CommissionCalculationResponse;
            Assert.NotNull(response);
            Assert.Equal(10 * 100 * 0.20m + 5 * 100 * 0.35m, response.AvalphaTechnologiesCommissionAmount);
            Assert.Equal(10 * 100 * 0.02m + 5 * 100 * 0.0755m, response.CompetitorCommissionAmount);
        }

        [Theory]
        [InlineData(-1, 0, 100)]
        [InlineData(0, -1, 100)]
        [InlineData(0, 0, -100)]
        public void Calculate_NegativeValues_ReturnsBadRequest(int local, int foreign, decimal avg)
        {
            var controller = new CommisionController();
            var request = new CommissionCalculationRequest
            {
                LocalSalesCount = local,
                ForeignSalesCount = foreign,
                AverageSaleAmount = avg
            };

            var result = controller.Calculate(request);
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Theory]
        [InlineData(100001, 0, 100)]
        [InlineData(0, 100001, 100)]
        [InlineData(0, 0, 1000001)]
        public void Calculate_UnrealisticallyHighValues_ReturnsBadRequest(int local, int foreign, decimal avg)
        {
            var controller = new CommisionController();
            var request = new CommissionCalculationRequest
            {
                LocalSalesCount = local,
                ForeignSalesCount = foreign,
                AverageSaleAmount = avg
            };

            var result = controller.Calculate(request);
            Assert.IsType<BadRequestObjectResult>(result);
        }
    }
}
