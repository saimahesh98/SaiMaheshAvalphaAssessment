using Microsoft.AspNetCore.Mvc;

namespace AvalphaTechnologies.CommissionCalculator.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommisionController : ControllerBase
    {
        [ProducesResponseType(typeof(CommissionCalculationResponse), 200)]
        [HttpPost]
        public IActionResult Calculate([FromBody] CommissionCalculationRequest calculationRequest)
        {
            // Input validation
            if (calculationRequest.LocalSalesCount < 0 || calculationRequest.ForeignSalesCount < 0 || calculationRequest.AverageSaleAmount < 0)
            {
                return BadRequest("Values must be non-negative.");
            }

            if (calculationRequest.LocalSalesCount > 100000 || calculationRequest.ForeignSalesCount > 100000 || calculationRequest.AverageSaleAmount > 1000000)
            {
                return BadRequest("Values are unrealistically high.");
            }

            // Avalpha commissions
            decimal avalphaLocal = 0.20m * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            decimal avalphaForeign = 0.35m * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            decimal avalphaTotal = avalphaLocal + avalphaForeign;

            // Competitor commissions
            decimal competitorLocal = 0.02m * calculationRequest.LocalSalesCount * calculationRequest.AverageSaleAmount;
            decimal competitorForeign = 0.0755m * calculationRequest.ForeignSalesCount * calculationRequest.AverageSaleAmount;
            decimal competitorTotal = competitorLocal + competitorForeign;

            // Return structured response
            var response = new CommissionCalculationResponse
            {
                AvalphaTechnologiesCommissionAmount = avalphaTotal,
                CompetitorCommissionAmount = competitorTotal
            };

            return Ok(response);
        }
    }

    public class CommissionCalculationRequest
    {
        public int LocalSalesCount { get; set; }
        public int ForeignSalesCount { get; set; }
        public decimal AverageSaleAmount { get; set; }
    }

    public class CommissionCalculationResponse
    {
        public decimal AvalphaTechnologiesCommissionAmount { get; set; }
        public decimal CompetitorCommissionAmount { get; set; }
    }
}
