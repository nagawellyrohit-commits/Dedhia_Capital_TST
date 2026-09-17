import re

html_content = """<!-- Goal-Based Services Section (Custom Tree Layout) Start -->
    <section class="container-fluid py-2 px-0" id="services">
        <style>
            .tree-layout-wrapper {
                width: 100%;
                max-width: 1100px;
                aspect-ratio: 1484 / 1060;
                margin: 0 auto;
                position: relative;
            }
            .tree-card-node {
                position: absolute;
                z-index: 10;
                width: 26%;
                min-width: 240px;
                transition: transform 0.3s ease;
            }
            .tree-card-node:hover {
                transform: translateY(-5px);
            }
            .tree-card {
                border-radius: 8px;
                background: #fff;
                box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                position: relative;
                border: 1px solid rgba(0,0,0,0.05);
            }
            .tree-card-header {
                color: #fff;
                padding: 10px 15px;
                font-size: clamp(12px, 1.2vw, 14px);
                font-weight: 600;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .tree-card-body {
                padding: 12px 15px;
                font-size: clamp(11px, 1.1vw, 13px);
                color: #555;
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
            }
            .tree-badge {
                position: absolute;
                width: 26px;
                height: 26px;
                border-radius: 50%;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 12px;
                border: 2px solid #fff;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                z-index: 12;
            }
            .tree-btn-explore {
                border: 1px solid #8C5B19;
                color: #8C5B19;
                font-weight: 700;
                text-transform: uppercase;
                text-decoration: none;
                border-radius: 50px;
                padding: 8px 16px;
                background: transparent;
                transition: all 0.3s ease;
                display: inline-block;
                width: 100%;
                text-align: center;
                font-size: clamp(11px, 1.1vw, 13px);
            }
            .tree-btn-explore:hover {
                background: #8C5B19;
                color: #fff;
            }
        </style>

        <div class="container text-center mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
            <p class="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3 mt-4">Goal-Based Services</p>
            <h1 class="display-5 mb-4 font-serif">Comprehensive Solutions for Every Milestone</h1>
        </div>

        <!-- Desktop Custom Absolute Tree Layout -->
        <div class="tree-layout-wrapper d-none d-lg-block mb-5 wow fadeIn" data-wow-delay="0.2s">
            <img src="img/tree.png" alt="Growth Tree" class="w-100 h-100 position-absolute" style="top: 0; left: 0; object-fit: contain; mix-blend-mode: multiply; opacity: 1;">
            
            <!-- Master SVG Overlay for Perfect Responsive Pointer Lines -->
            <svg class="position-absolute w-100 h-100" style="top: 0; left: 0; z-index: 5; pointer-events: none;" viewBox="0 0 100 100" preserveAspectRatio="none">
                <!-- Line 1: Mutual Fund -->
                <line x1="62" y1="12" x2="56" y2="18" stroke="#022672" stroke-width="0.3" />
                <circle cx="56" cy="18" r="0.8" fill="#022672" stroke="#fff" stroke-width="0.2" />
                
                <!-- Line 2: SIFs -->
                <line x1="30" y1="25" x2="38" y2="31" stroke="#9d7741" stroke-width="0.3" />
                <circle cx="38" cy="31" r="0.8" fill="#9d7741" stroke="#fff" stroke-width="0.2" />

                <!-- Line 3: PMS -->
                <line x1="70" y1="30" x2="62" y2="34" stroke="#0F766E" stroke-width="0.3" />
                <circle cx="62" cy="34" r="0.8" fill="#0F766E" stroke="#fff" stroke-width="0.2" />

                <!-- Line 4: Insurance -->
                <line x1="27" y1="56" x2="35" y2="52" stroke="#16A34A" stroke-width="0.3" />
                <circle cx="35" cy="52" r="0.8" fill="#16A34A" stroke="#fff" stroke-width="0.2" />

                <!-- Line 5: Explore -->
                <line x1="72" y1="62" x2="65" y2="56" stroke="#8B5CF6" stroke-width="0.3" />
                <circle cx="65" cy="56" r="0.8" fill="#8B5CF6" stroke="#fff" stroke-width="0.2" />
            </svg>

            <!-- Card 1: Mutual Funds -->
            <div class="tree-card-node" style="top: calc(12% - 13px); left: 62%;">
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #022672;">
                        <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                    </div>
                    <div class="tree-card-body">Core liquid assets, regulated mutual funds, and guaranteed returns.</div>
                    <div class="tree-badge" style="background-color: #022672; left: -13px; top: 13px;">1</div>
                </div>
            </div>

            <!-- Card 2: SIFs -->
            <div class="tree-card-node" style="top: calc(25% - 13px); right: 70%;">
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #9d7741;">
                        <i class="fa fa-pie-chart me-2"></i> Specialized Investment Funds (SIFs)
                    </div>
                    <div class="tree-card-body">High-alpha opportunities, private markets, and cross-border corridors.</div>
                    <div class="tree-badge" style="background-color: #9d7741; right: -13px; top: 13px;">2</div>
                </div>
            </div>

            <!-- Card 3: PMS -->
            <div class="tree-card-node" style="top: calc(30% - 13px); left: 70%;">
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #0F766E;">
                        <i class="fa fa-users me-2"></i> Portfolio Management Services (PMS)
                    </div>
                    <div class="tree-card-body">Holistic diagnostic audits, governance, and retirement roadmaps.</div>
                    <div class="tree-badge" style="background-color: #0F766E; left: -13px; top: 13px;">3</div>
                </div>
            </div>

            <!-- Card 4: Insurance -->
            <div class="tree-card-node" style="top: calc(56% - 13px); right: 73%;">
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #16A34A;">
                        <i class="fa fa-shield-alt me-2"></i> Insurance
                    </div>
                    <div class="tree-card-body">Safeguarding life, health, and family wealth against uncertainties.</div>
                    <div class="tree-badge" style="background-color: #16A34A; right: -13px; top: 13px;">4</div>
                </div>
            </div>

            <!-- Card 5: Explore -->
            <div class="tree-card-node" style="top: calc(62% - 13px); left: 72%;">
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #8B5CF6;">
                        <i class="fa fa-sitemap me-2"></i> Explore More service
                    </div>
                    <div class="tree-card-body text-center" style="background: linear-gradient(135deg, #FBE2A4, #D4A054);">
                        <a href="service.html" class="tree-btn-explore">EXPLORE <i class="fa fa-arrow-right ms-1"></i></a>
                    </div>
                    <div class="tree-badge" style="background-color: #8B5CF6; left: -13px; top: 13px;">5</div>
                </div>
            </div>
        </div>

        <!-- Mobile Fallback Layout -->
        <div class="d-lg-none px-3 mb-5">
            <img src="img/tree.png" alt="Growth Tree" class="img-fluid w-100 mb-4" style="mix-blend-mode: multiply; max-height: 400px; object-fit: contain;">
            <div class="d-flex flex-column gap-4">
                <div class="tree-card shadow bg-white">
                    <div class="tree-card-header" style="background-color: #022672;">Mutual Fund (MF)</div>
                    <div class="tree-card-body">Core liquid assets, regulated mutual funds, and guaranteed returns.</div>
                </div>
                <!-- Other cards omitted for brevity in Python script, we will just use regex to replace desktop part -->
"""

with open('index.html', 'r') as f:
    content = f.read()

# To avoid messing up the mobile fallback which is perfectly fine, we only replace the desktop section.
# We will match from <style> to <!-- Mobile Fallback Layout -->
pattern = r'<style>.*?<!-- Mobile Fallback Layout -->'
replaced = re.sub(pattern, html_content.split('<!-- Mobile Fallback Layout -->')[0] + '<!-- Mobile Fallback Layout -->', content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(replaced)

print("Unified scalable layout applied.")
