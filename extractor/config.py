#configuration file
gross_profit=["Gross profit","Gross margin","Gross Profit","Gross Margin"]
r_and_d_pattern=["Research and development expense"]
in_process_pattern=["In-process research and development"]


units_pattern = ["thousands","millions"] #acceptable units
company_names_pattern = [".*Inc\.",".*CORPORATION",".*International",".*Subsidiaries",".*Incorporation",".*Company"]


statements = [
".*Consolidated.*Statement.*Operations.*",
".*Consolidated.*Statement.*Income.*",
".*Consolidated.*Statement.*Earnings.*",
]
ebt_patterns=["Earnings before income taxes and after-tax earnings from joint ventures","Net earnings before income tax \(benefit\) expense","INCOME BEFORE INCOME TAXES","INCOME FROM CONTINUING OPERATIONS BEFORE INCOME TAXES","Income before provision for income taxes","Earnings before provision for taxes on income","Income before income taxes","Income Before Income Taxes","Income\/\(loss\).*before.*income.*taxes","Income before income tax expense","Income before income tax expense","Earnings from continuing operations before income taxes","Income \(loss\) before income taxes", "Loss from continuing operations before income taxes","Income from continuing operations before income taxes","EARNINGS FROM CONTINUING OPERATIONS BEFORE INCOME TAXES","Loss before income taxes","Income \(loss\) before income taxes.*","Loss before tax","Income Before \(Provision\) Benefit For Income Taxes","Net income \(loss\) before income taxes","Income before benefit for income taxes"]


#net_income=["NET INCOME FROM CONTINUING OPERATIONS","NET INCOME",r"(?:Net earnings attributable to The Kroger Co\.$){1}",r"(?:Net earnings$){1}","Net income \(loss\)","Net income","Net income\/\(loss\)","Net loss","Loss from continuing operations\, net of taxes"]


#net_income=["NET INCOME FROM CONTINUING OPERATIONS","NET INCOME ATTRIBUTABLE TO COSTCO","NET INCOME",r"(?:Net earnings attributable.*){1}","Consolidated net income attributable to Walmart",r"(?:Net earnings$){1}","Net income \(loss\)","Net income","Net income\/\(loss\)",r"(?:Net loss$){1}","Net earnings \/ \(loss\)"]


net_income=["Net income including noncontrolling interest","Net earnings attributable to General Mills","Consolidated net income attributable to Walmart" ,"NET INCOME ATTRIBUTABLE TO COSTCO","CONSOLIDATED NET INCOME.*","Net earnings attributable.*","Net Income",r"(?:Net earnings$){1}",r"(?:Net earnings attributable to The Kroger Co\.$){1}",r"(?:Net loss$){1}","EARN.*","NET L.*",r"(?:Net income\/\(loss\)$){1}","Net earnings \/ \(loss\)",r"(?:Net income$){1}",r"(?:NET INCOME$)","NET EARNINGS ATTRIBUTABLE TO.*",r"(?:Net income \(loss\)$){1}","Net income attributable to The.*","Net income \(loss\)","Net income attributable to CBI","Net loss attributable to.*"]

total_revenue_patterns = ["Total revenues",r"(?:Revenues$){1}",r"(?:Revenue$){1}","Total revenue","NET OPERATING REVENUES",r"(?:Sales$){1}","Total net revenue.*","Total Net Revenue","Total Revenue","Total Revenues","Net Revenue","Net revenue","Net Revenues","Sales to customer","Net Sale","Net Sales","NET SALES","Net sales","Total net sales","Net Operating Revenues","Total operating revenues"]

sga_patterns = ["General.*administrative.*","Selling.*informational.*administrative.*","Selling.*general.*administrative","Total operating expenses", "Total.*selling.*administrative.*","Operating, selling, general and administrative expenses","Marketing.*administration.*research.*","Selling.*marketing.*and.*administrative.*expenses"]

cost_of_goods_sold = ["Company restaurant expenses","Total cost of revenues","Merchandise costs",r"(Total costs and expenses$){1}","Total cost of revenue.*","Cost of sales","items shown separately below","Cost of Sale.*","COGs","Cost of goods sold","Cost of Revenue.?","Cost of revenue","Cost of products sold","Cost of services.*","Property operating expenses"]

#research_and_dev = ["Research and development.*"]
product_dev = ["Product Development.*"]
sales_and_marketing = ["Selling and marketing","Sales and marketing","Selling, general, administrative and other"]
total_operating_exp = ["Total operating expense.*","Total operating costs and expense.*",]

net_interest_exp = ["Interest expense","Interest expense.*income.*net.*","Interest income.*expense.*net.*","Interest, net","Interest expense.*net", "Interest expense","Interest and debt expense","Net interest expense"]
#other_income_exp = ["Other.*expense\/\(income\)","Other expenses","Other expense.*income.*net","Other expense.*net","Interest.*other.*income.*expense.*net","Other.*income/(loss).*net","Net.*other.*(income).*/.*expense","Other.*(income).*expense.*net","Other.*(income).*expense"]


other_income_exp=["ajay"]

tax_patterns = [r"Income tax benefit \(provision\)","Income tax expense","Income tax expense (benefit)","Income tax provision","Provision/(benefit) for taxes on income","Provision for income taxes","Income taxes","Provision.*for.*taxes.*on.*income.*"]



depriciation_amort=["Depreciation",
"Amortization",
"Depreciation and amortization",
"Depreciation expense",
"Depreciation and amortization of property, equipment and intangibles"
"Depreciation, amortization, and other"
"Depreciation and amortization expense"
]
ebit_patterns=[
    "Income from operations",
"Operating.*Profit",
"Income from operations",
"Operating.*income.*\(loss\)",
"Operating.*income\/\(loss\)",
"Operating.*profit",
"Operating loss",
"OPERATING INCOME",
"Operating income",
"Operating Income",
"Loss from operations"
    ]
statements_cash_flow=[".*Consolidated Statements of Cash Flows"]


