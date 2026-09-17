import re

html_content = """<!-- Goal-Based Services Section (Custom Tree Layout) Start -->
    <section class="container-fluid py-2 px-0" id="services">
        <style>
            /* Bypass caching by injecting CSS directly */
            .tree-layout-wrapper {
                max-width: 1100px;
                aspect-ratio: 1484 / 1060;
                margin: 0 auto;
                position: relative;
            }
            .tree-card-node {
                position: absolute;
                z-index: 10;
                width: 320px;
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
                font-size: 14px;
                font-weight: 600;
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
            }
            .tree-card-body {
                padding: 12px 15px;
                font-size: 13px;
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
            }
            .tree-btn-explore:hover {
                background: #8C5B19;
                color: #fff;
            }
            
            /* Pointer Lines */
            .tree-pointer {
                position: absolute;
                z-index: 1;
                pointer-events: none;
            }
            
            .tree-leaf-dot {
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: 2px solid #fff;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            }
        </style>

        <div class="container text-center mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
            <p class="d-inline-block border rounded text-primary fw-semi-bold py-1 px-3 mt-4">Goal-Based Services</p>
            <h1 class="display-5 mb-4 font-serif">Comprehensive Solutions for Every Milestone</h1>
        </div>

        <!-- Desktop Custom Absolute Tree Layout -->
        <div class="tree-layout-wrapper d-none d-lg-block mb-5 wow fadeIn" data-wow-delay="0.2s">
            <img src="img/tree.png" alt="Growth Tree" class="w-100 h-100" style="object-fit: contain; mix-blend-mode: multiply; opacity: 1;">
            
            <!-- Card 1: Mutual Funds -->
            <div class="tree-card-node" style="top: -2%; right: 12%;">
                <svg class="tree-pointer" width="60" height="80" style="left: -40px; top: 15px; overflow: visible;">
                    <path d="M 0 0 C -20 30, -50 50, -70 80" fill="none" stroke="#022672" stroke-width="2"/>
                    <circle cx="-70" cy="80" r="5" fill="#022672" stroke="#fff" stroke-width="2" />
                </svg>
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #022672;">
                        <i class="fa fa-chart-line me-2"></i> Mutual Fund (MF)
                    </div>
                    <div class="tree-card-body">Core liquid assets, regulated mutual funds, and guaranteed returns.</div>
                    <div class="tree-badge" style="background-color: #022672; left: -13px; top: 10px;">1</div>
                </div>
            </div>

            <!-- Card 2: SIFs -->
            <div class="tree-card-node" style="top: 15%; left: 8%;">
                <svg class="tree-pointer" width="60" height="80" style="right: -10px; top: 15px; overflow: visible;">
                    <path d="M 0 0 C 30 20, 50 40, 80 60" fill="none" stroke="#9d7741" stroke-width="2"/>
                    <circle cx="80" cy="60" r="5" fill="#9d7741" stroke="#fff" stroke-width="2" />
                </svg>
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #9d7741;">
                        <i class="fa fa-pie-chart me-2"></i> Specialized Investment Funds (SIFs)
                    </div>
                    <div class="tree-card-body">High-alpha opportunities, private markets, and cross-border corridors.</div>
                    <div class="tree-badge" style="background-color: #9d7741; right: -13px; top: 10px;">2</div>
                </div>
            </div>

            <!-- Card 3: PMS -->
            <div class="tree-card-node" style="top: 25%; right: 4%;">
                <svg class="tree-pointer" width="80" height="60" style="left: -40px; top: 15px; overflow: visible;">
                    <path d="M 0 0 C -30 20, -70 30, -110 50" fill="none" stroke="#0F766E" stroke-width="2"/>
                    <circle cx="-110" cy="50" r="5" fill="#0F766E" stroke="#fff" stroke-width="2" />
                </svg>
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #0F766E;">
                        <i class="fa fa-users me-2"></i> Portfolio Management Services (PMS)
                    </div>
                    <div class="tree-card-body">Holistic diagnostic audits, governance, and retirement roadmaps.</div>
                    <div class="tree-badge" style="background-color: #0F766E; left: -13px; top: 10px;">3</div>
                </div>
            </div>

            <!-- Card 4: Insurance -->
            <div class="tree-card-node" style="top: 48%; left: 5%;">
                <svg class="tree-pointer" width="60" height="40" style="right: -10px; top: 15px; overflow: visible;">
                    <path d="M 0 0 C 30 10, 50 15, 80 25" fill="none" stroke="#16A34A" stroke-width="2"/>
                    <circle cx="80" cy="25" r="5" fill="#16A34A" stroke="#fff" stroke-width="2" />
                </svg>
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #16A34A;">
                        <i class="fa fa-shield-alt me-2"></i> Insurance
                    </div>
                    <div class="tree-card-body">Safeguarding life, health, and family wealth against uncertainties.</div>
                    <div class="tree-badge" style="background-color: #16A34A; right: -13px; top: 10px;">4</div>
                </div>
            </div>

            <!-- Card 5: Explore -->
            <div class="tree-card-node" style="top: 50%; right: 3%;">
                <svg class="tree-pointer" width="80" height="40" style="left: -40px; top: 15px; overflow: visible;">
                    <path d="M 0 0 C -20 10, -50 20, -70 30" fill="none" stroke="#8B5CF6" stroke-width="2"/>
                    <circle cx="-70" cy="30" r="5" fill="#8B5CF6" stroke="#fff" stroke-width="2" />
                </svg>
                <div class="tree-card">
                    <div class="tree-card-header d-flex align-items-center" style="background-color: #8B5CF6;">
                        <i class="fa fa-sitemap me-2"></i> Explore More service
                    </div>
                    <div class="tree-card-body text-center" style="background: linear-gradient(135deg, #FBE2A4, #D4A054);">
                        <a href="service.html" class="tree-btn-explore">EXPLORE <i class="fa fa-arrow-right ms-1"></i></a>
                    </div>
                    <div class="tree-badge" style="background-color: #8B5CF6; left: -13px; top: 10px;">5</div>
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
                <!-- Add others -->
            </div>
        </div>
    </section>
    <!-- Goal-Based Services Section End -->"""

with open('index.html', 'r') as f:
    content = f.read()

pattern = r'<!-- Goal-Based Services Section \(Custom Tree Layout\) Start -->.*?<!-- Goal-Based Services Section End -->'
replaced = re.sub(pattern, html_content, content, flags=re.DOTALL)

with open('index.html', 'w') as f:
    f.write(replaced)

print("Injected inline CSS and updated layout with SVG pointers.")
