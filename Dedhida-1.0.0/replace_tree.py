import re

with open('index.html', 'r') as f:
    content = f.read()

new_html = """<!-- Serpentine Roadmap Diagram for 5 Service Categories -->
            <div class="milestone-roadmap-wrapper wow fadeInUp" data-wow-delay="0.2s" style="position: relative; padding: 40px 0;">
                <!-- Center Tree Background -->
                <img src="img/tree.png" alt="Tree Background" class="roadmap-tree-bg d-none d-md-block" style="position: absolute; top: 0; left: 50%; transform: translateX(-50%); height: 100%; max-width: 400px; object-fit: cover; z-index: 0;">

                <!-- Step 1: Traditional & Regulated Investments (Right) -->
                <div class="roadmap-step step-right" style="position: relative; z-index: 1;">
                    <div class="roadmap-node" style="background: #022672; color: #fff;">1</div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header header-traditional">
                            <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                        </div>
                        <div class="roadmap-card-body">
                            <p class="text-muted small mb-2 fw-semi-bold">Core liquid assets, regulated mutual funds, and guaranteed returns.</p>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Alternative & Global Investments (Left) -->
                <div class="roadmap-step step-left" style="position: relative; z-index: 1;">
                    <div class="roadmap-node" style="background: #C9954B; color: #fff;">2</div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header header-alternative">
                            <i class="fa fa-globe-asia me-2"></i> Specialized Investment Funds (SIFs)
                        </div>
                        <div class="roadmap-card-body">
                            <p class="text-muted small mb-2 fw-semi-bold">High-alpha opportunities, private markets, and cross-border corridors.</p>
                        </div>
                    </div>
                </div>

                <!-- Step 3: Wealth Planning (Right) -->
                <div class="roadmap-step step-right" style="position: relative; z-index: 1;">
                    <div class="roadmap-node" style="background: #0F766E; color: #fff;">3</div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header header-wealth">
                            <i class="fa fa-chess-queen me-2"></i> Portfolio Management Services (PMS)
                        </div>
                        <div class="roadmap-card-body">
                            <p class="text-muted small mb-2 fw-semi-bold">Holistic diagnostic audits, governance, and retirement roadmaps.</p>
                        </div>
                    </div>
                </div>

                <!-- Step 4: Protection Solutions (Left) -->
                <div class="roadmap-step step-left" style="position: relative; z-index: 1;">
                    <div class="roadmap-node" style="background: #16A34A; color: #fff;">4</div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header header-protection">
                            <i class="fa fa-shield-alt me-2"></i> Insurance
                        </div>
                        <div class="roadmap-card-body">
                            <p class="text-muted small mb-2 fw-semi-bold">Safeguarding life, health, and family wealth against uncertainties.</p>
                        </div>
                    </div>
                </div>

                <!-- Step 5: Legacy & Business Planning (Right) -->
                <div class="roadmap-step step-right" style="position: relative; z-index: 1;">
                    <div class="roadmap-node" style="background: #9333EA; color: #fff;">5</div>
                    <div class="roadmap-card">
                        <div class="roadmap-card-header header-legacy">
                            <i class="fa fa-sitemap me-2"></i> Explore More service
                        </div>
                        <div class="roadmap-card-body">
                            <a href="service.html" class="btn btn-sm btn-outline-primary rounded-pill">Explore <i class="fa fa-arrow-right ms-1"></i></a>
                        </div>
                    </div>
                </div>
            </div>
"""

pattern = r'<!-- Serpentine Roadmap Diagram for 5 Service Categories -->.*?<div class="col-lg-7">.*?</div>\s*</div>\s*</div>'
# Or just replace the whole row
pattern2 = r'<!-- Serpentine Roadmap Diagram for 5 Service Categories -->\s*<div class="row g-5 align-items-center wow fadeInUp" data-wow-delay="0.2s">.*?<div class="col-lg-7">.*?</div>\s*</div>\s*</div>'

replaced = re.sub(pattern2, new_html, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(replaced)

print("Restored original tree layout")
