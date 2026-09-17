import re

html_content = """<!-- Tree Layout Start -->
            <div class="container-fluid py-2 px-0">
                <!-- Desktop Custom Absolute Tree Layout -->
                <div class="tree-layout-wrapper position-relative mx-auto d-none d-lg-block mb-5" style="max-width: 1200px; aspect-ratio: 1484 / 1060;">
                    <img src="img/tree.png" alt="Growth Tree" class="w-100 h-100" style="object-fit: contain; mix-blend-mode: multiply; opacity: 0.9;">
                    
                    <!-- Card 1: Mutual Funds -->
                    <div class="tree-card-node node-right" style="top: 3%; right: 12%; width: 330px;">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header d-flex align-items-center" style="background-color: #022672;">
                                <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                            </div>
                            <div class="tree-card-body">
                                Core liquid assets, regulated mutual funds, and guaranteed returns.
                            </div>
                            <div class="tree-badge" style="background-color: #022672; left: -20px; top: 15px;">1</div>
                        </div>
                    </div>

                    <!-- Card 2: SIFs -->
                    <div class="tree-card-node node-left" style="top: 18%; left: 8%; width: 330px;">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header d-flex align-items-center" style="background-color: #9d7741;">
                                <i class="fa fa-pie-chart me-2"></i> Specialized Investment Funds (SIFs)
                            </div>
                            <div class="tree-card-body">
                                High-alpha opportunities, private markets, and cross-border corridors.
                            </div>
                            <div class="tree-badge" style="background-color: #9d7741; right: -20px; top: 15px;">2</div>
                        </div>
                    </div>

                    <!-- Card 3: PMS -->
                    <div class="tree-card-node node-right" style="top: 25%; right: 4%; width: 330px;">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header d-flex align-items-center" style="background-color: #0F766E;">
                                <i class="fa fa-users me-2"></i> Portfolio Management Services (PMS)
                            </div>
                            <div class="tree-card-body">
                                Holistic diagnostic audits, governance, and retirement roadmaps.
                            </div>
                            <div class="tree-badge" style="background-color: #0F766E; left: -20px; top: 35px;">3</div>
                        </div>
                    </div>

                    <!-- Card 4: Insurance -->
                    <div class="tree-card-node node-left" style="top: 48%; left: 5%; width: 300px;">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header d-flex align-items-center" style="background-color: #16A34A;">
                                <i class="fa fa-shield-alt me-2"></i> Insurance
                            </div>
                            <div class="tree-card-body">
                                Safeguarding life, health, and family wealth against uncertainties.
                            </div>
                            <div class="tree-badge" style="background-color: #16A34A; right: -20px; top: 35px;">4</div>
                        </div>
                    </div>

                    <!-- Card 5: Explore -->
                    <div class="tree-card-node node-right" style="top: 48%; right: 4%; width: 300px;">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header d-flex align-items-center" style="background-color: #8B5CF6;">
                                <i class="fa fa-sitemap me-2"></i> Explore More service
                            </div>
                            <div class="tree-card-body" style="background: linear-gradient(135deg, #FBE2A4, #D4A054);">
                                <a href="service.html" class="tree-btn-explore w-100 text-center d-block">EXPLORE <i class="fa fa-arrow-right ms-1"></i></a>
                            </div>
                            <div class="tree-badge" style="background-color: #8B5CF6; left: -20px; top: 35px;">5</div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Fallback Layout -->
                <div class="d-lg-none px-3 mb-5">
                    <img src="img/tree.png" alt="Growth Tree" class="img-fluid w-100 mb-4" style="mix-blend-mode: multiply; max-height: 400px; object-fit: contain;">
                    <div class="d-flex flex-column gap-4">
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header" style="background-color: #022672;">
                                <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                            </div>
                            <div class="tree-card-body">Core liquid assets, regulated mutual funds, and guaranteed returns.</div>
                        </div>
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header" style="background-color: #9d7741;">
                                <i class="fa fa-pie-chart me-2"></i> Specialized Investment Funds (SIFs)
                            </div>
                            <div class="tree-card-body">High-alpha opportunities, private markets, and cross-border corridors.</div>
                        </div>
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header" style="background-color: #0F766E;">
                                <i class="fa fa-users me-2"></i> Portfolio Management Services (PMS)
                            </div>
                            <div class="tree-card-body">Holistic diagnostic audits, governance, and retirement roadmaps.</div>
                        </div>
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header" style="background-color: #16A34A;">
                                <i class="fa fa-shield-alt me-2"></i> Insurance
                            </div>
                            <div class="tree-card-body">Safeguarding life, health, and family wealth against uncertainties.</div>
                        </div>
                        <div class="tree-card shadow bg-white">
                            <div class="tree-card-header" style="background-color: #8B5CF6;">
                                <i class="fa fa-sitemap me-2"></i> Explore More service
                            </div>
                            <div class="tree-card-body" style="background: linear-gradient(135deg, #FBE2A4, #D4A054);">
                                <a href="service.html" class="tree-btn-explore w-100 text-center d-block">EXPLORE <i class="fa fa-arrow-right ms-1"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Tree Layout End -->"""

with open('index.html', 'r') as f:
    content = f.read()

# Replace the previous layout
pattern = r'<!-- Serpentine Roadmap Diagram for 5 Service Categories -->.*?<!-- Our Mission & Vision Start -->'
replaced = re.sub(pattern, html_content + '\n\n    <!-- Our Mission & Vision Start -->', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(replaced)

# Now inject CSS into style.css
css_content = """
/* --- Custom Tree Layout --- */
.tree-card-node {
    position: absolute;
    z-index: 10;
    transition: transform 0.3s ease;
}
.tree-card-node:hover {
    transform: translateY(-5px);
}
.tree-card {
    border-radius: 12px;
    overflow: visible;
    position: relative;
    border: 1px solid rgba(0,0,0,0.05);
}
.tree-card-header {
    color: #fff;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 600;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
}
.tree-card-body {
    padding: 14px 16px;
    font-size: 13px;
    color: #555;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}
.tree-badge {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 12px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    z-index: 12;
}
.tree-btn-explore {
    border: 1px solid #B47C35;
    color: #8C5B19;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 50px;
    padding: 8px 16px;
    background: transparent;
    transition: all 0.3s ease;
}
.tree-btn-explore:hover {
    background: #8C5B19;
    color: #fff;
}
"""

with open('css/style.css', 'a') as f:
    f.write(css_content)

print("Injected HTML and CSS for custom tree layout.")
