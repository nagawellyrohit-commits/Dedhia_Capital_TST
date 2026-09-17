import re

with open('index.html', 'r') as f:
    content = f.read()

start_marker = r'<!-- Serpentine Roadmap Diagram for 5 Service Categories -->'
end_marker = r'<!-- Our Mission & Vision Start -->'

# The content between start_marker and end_marker contains the roadmap wrapper and the closing div for the container-fluid.
# Wait, let's just use regex to replace milestone-roadmap-wrapper.

new_html = """<!-- Serpentine Roadmap Diagram for 5 Service Categories -->
            <div class="row g-5 align-items-center wow fadeInUp" data-wow-delay="0.2s">
                <div class="col-lg-5 text-center">
                    <img src="img/tree_iamge .png" alt="Growth Tree" class="img-fluid" style="max-height: 600px; object-fit: contain;">
                </div>
                <div class="col-lg-7">
                    <div class="d-flex flex-column gap-3">
                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: rgba(255, 255, 255, 0.9);">
                            <div class="card-header border-0 text-white p-3 fw-bold" style="background-color: #022672;">
                                <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                            </div>
                            <div class="card-body p-3">
                                <p class="text-muted small mb-0 fw-semi-bold">Core liquid assets, regulated mutual funds, and guaranteed returns.</p>
                            </div>
                        </div>

                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: rgba(255, 255, 255, 0.9);">
                            <div class="card-header border-0 text-white p-3 fw-bold" style="background-color: #C9954B;">
                                <i class="fa fa-globe-asia me-2"></i> Specialized Investment Funds (SIFs)
                            </div>
                            <div class="card-body p-3">
                                <p class="text-muted small mb-0 fw-semi-bold">High-alpha opportunities, private markets, and cross-border corridors.</p>
                            </div>
                        </div>

                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: rgba(255, 255, 255, 0.9);">
                            <div class="card-header border-0 text-white p-3 fw-bold" style="background-color: #0F766E;">
                                <i class="fa fa-chess-queen me-2"></i> Portfolio Management Services (PMS)
                            </div>
                            <div class="card-body p-3">
                                <p class="text-muted small mb-0 fw-semi-bold">Holistic diagnostic audits, governance, and retirement roadmaps.</p>
                            </div>
                        </div>

                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: rgba(255, 255, 255, 0.9);">
                            <div class="card-header border-0 text-white p-3 fw-bold" style="background-color: #16A34A;">
                                <i class="fa fa-shield-alt me-2"></i> Insurance
                            </div>
                            <div class="card-body p-3">
                                <p class="text-muted small mb-0 fw-semi-bold">Safeguarding life, health, and family wealth against uncertainties.</p>
                            </div>
                        </div>

                        <div class="card border-0 shadow-sm rounded-4 overflow-hidden" style="background: rgba(255, 255, 255, 0.9);">
                            <div class="card-header border-0 text-white p-3 fw-bold" style="background-color: #9333EA;">
                                <i class="fa fa-sitemap me-2"></i> Explore More service
                            </div>
                            <div class="card-body p-3">
                                <a href="service.html" class="btn btn-sm btn-outline-primary rounded-pill mt-1 px-4">Explore <i class="fa fa-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
"""

pattern = r'<!-- Serpentine Roadmap Diagram for 5 Service Categories -->.*?<div class="roadmap-step step-right">\s*<div class="roadmap-node">5</div>.*?</div>\s*</div>\s*</div>'

replaced = re.sub(pattern, new_html, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(replaced)

print("Replaced roadmap successfully.")
