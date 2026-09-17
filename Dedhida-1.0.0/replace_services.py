import re

html_content = """
                <div class="col-6 col-md-4 col-lg-3 wow fadeInUp" data-wow-delay="0.1s">
                    <a href="service-detail.html?service={url}" class="text-decoration-none">
                        <div class="service-category-card text-center p-4 h-100 d-flex flex-column justify-content-center align-items-center">
                            <i class="fa {icon} fa-3x text-primary mb-3"></i>
                            <h6 class="mb-0 text-dark fw-bold">{title}</h6>
                        </div>
                    </a>
                </div>"""

services = [
    ("mutual-funds", "fa-chart-pie", "Mutual Funds"),
    ("ncd", "fa-file-invoice-dollar", "Bonds / NCD"),
    ("corporate-fd", "fa-university", "Corporate & Bank FD"),
    ("pms", "fa-briefcase", "Portfolio Management (PMS)"),
    ("sif", "fa-gem", "Specialized Investment Fund (SIF)"),
    ("aif", "fa-chart-line", "Alternative Investments (AIF)"),
    ("global-investing", "fa-globe", "Global Investing"),
    ("gift-city", "fa-building", "GIFT City Funds"),
    ("pre-ipo", "fa-rocket", "Unlisted Pre-IPO Opportunities"),
    ("portfolio-review", "fa-search-dollar", "Portfolio Review & Diagnostics"),
    ("family-wealth", "fa-users", "Family Wealth Management"),
    ("nps", "fa-piggy-bank", "National Pension System (NPS)"),
    ("insurance", "fa-heartbeat", "Life Insurance"),
    ("general-insurance", "fa-shield-alt", "General Insurance"),
    ("succession", "fa-handshake", "Business Succession Planning"),
    ("estate", "fa-scroll", "Family Trust & Estate Roadmap")
]

new_grid = '<div class="row g-4">\n'
for url, icon, title in services:
    new_grid += html_content.format(url=url, icon=icon, title=title) + '\n'
new_grid += '            </div>'

with open("service.html", "r") as f:
    data = f.read()

# Using regex to find the two <div class="row g-4"> blocks that contain the old categories
# The first block starts at <div class="row g-4"> and ends before <!-- Service Categories End -->
pattern = re.compile(r'<div class="row g-4">.*?</div>\s*</div>\s*</div>\s*<!-- Service Categories End -->', re.DOTALL)
new_data = pattern.sub(new_grid + '\n        </div>\n    </div>\n    <!-- Service Categories End -->', data)

with open("service.html", "w") as f:
    f.write(new_data)
print("Done")
