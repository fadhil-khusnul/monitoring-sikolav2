<!-- Theme Settings -->
<div class="offcanvas offcanvas-end right-bar" tabindex="-1" id="theme-settings-offcanvas">
    <div class="d-flex align-items-center w-100 p-0 offcanvas-header">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs nav-bordered nav-justified w-100" role="tablist">
            <li class="nav-item">
                <a class="nav-link py-2" data-bs-toggle="tab" href="#chat-tab" role="tab">
                    <i class="mdi mdi-message-text d-block font-22 my-1"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link py-2" data-bs-toggle="tab" href="#tasks-tab" role="tab">
                    <i class="mdi mdi-format-list-checkbox d-block font-22 my-1"></i>
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link py-2 active" data-bs-toggle="tab" href="#settings-tab" role="tab">
                    <i class="mdi mdi-cog-outline d-block font-22 my-1"></i>
                </a>
            </li>
        </ul>
    </div>

    <div class="offcanvas-body p-3 h-100" data-simplebar>
        <!-- Tab panes -->
        <div class="tab-content pt-0">
            <div class="tab-pane" id="chat-tab" role="tabpanel">

                <form class="search-bar">
                    <div class="position-relative">
                        <input type="text" class="form-control" placeholder="Search...">
                        <span class="mdi mdi-magnify"></span>
                    </div>
                </form>

                <h6 class="fw-medium mt-2 text-uppercase">Group Chats</h6>

                <div>
                    <a href="javascript: void(0);" class="text-reset notification-item ps-3 mb-2 d-block">
                        <i class="mdi mdi-checkbox-blank-circle-outline me-1 text-success"></i>
                        <span class="mb-0 mt-1">App Development</span>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item ps-3 mb-2 d-block">
                        <i class="mdi mdi-checkbox-blank-circle-outline me-1 text-warning"></i>
                        <span class="mb-0 mt-1">Office Work</span>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item ps-3 mb-2 d-block">
                        <i class="mdi mdi-checkbox-blank-circle-outline me-1 text-danger"></i>
                        <span class="mb-0 mt-1">Personal Group</span>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item ps-3 d-block">
                        <i class="mdi mdi-checkbox-blank-circle-outline me-1"></i>
                        <span class="mb-0 mt-1">Freelance</span>
                    </a>
                </div>

                <h6 class="fw-medium mt-3 text-uppercase">Favourites <a href="javascript: void(0);" class="font-18 text-danger"><i class="float-end mdi mdi-plus-circle"></i></a></h6>

                <div>
                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-10.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status online"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Andrew Mackie</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">It will seem like simplified English.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-1.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status away"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Rory Dalyell</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">To an English person, it will seem like simplified</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-9.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status busy"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Jaxon Dunhill</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">To achieve this, it would be necessary.</p>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>

                <h6 class="fw-medium mt-3 text-uppercase">Other Chats <a href="javascript: void(0);" class="font-18 text-danger"><i class="float-end mdi mdi-plus-circle"></i></a></h6>

                <div class="pb-4">
                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-2.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status online"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Jackson Therry</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">Everyone realizes why a new common language.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-4.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status away"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Charles Deakin</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">The languages only differ in their grammar.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-5.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status online"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Ryan Salting</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">If several languages coalesce the grammar of the resulting.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-6.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status online"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Sean Howse</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">It will seem like simplified English.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-7.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status busy"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Dean Coward</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">The new common language will be more simple.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset notification-item">
                        <div class="d-flex align-items-start noti-user-item">
                            <div class="position-relative me-2">
                                <img src="assets/images/users/user-8.jpg" class="rounded-circle avatar-sm" alt="user-pic">
                                <i class="mdi mdi-circle user-status away"></i>
                            </div>
                            <div class="overflow-hidden">
                                <h6 class="mt-0 mb-1 font-14">Hayley East</h6>
                                <div class="font-13 text-muted">
                                    <p class="mb-0 text-truncate">One could refuse to pay expensive translators.</p>
                                </div>
                            </div>
                        </div>
                    </a>

                    <div class="text-center mt-3">
                        <a href="javascript:void(0);" class="btn btn-sm btn-white">
                            <i class="mdi mdi-spin mdi-loading me-2"></i>
                            Load more
                        </a>
                    </div>
                </div>

            </div>

            <div class="tab-pane" id="tasks-tab" role="tabpanel">
                <h6 class="fw-medium p-3 m-0 text-uppercase">Working Tasks</h6>
                <div class="px-2">
                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">App Development<span class="float-end">75%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">Database Repair<span class="float-end">37%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-info" role="progressbar" style="width: 37%" aria-valuenow="37" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">Backup Create<span class="float-end">52%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-warning" role="progressbar" style="width: 52%" aria-valuenow="52" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>
                </div>

                <h6 class="fw-medium mb-0 mt-4 text-uppercase">Upcoming Tasks</h6>

                <div>
                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">Sales Reporting<span class="float-end">12%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-danger" role="progressbar" style="width: 12%" aria-valuenow="12" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">Redesign Website<span class="float-end">67%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-primary" role="progressbar" style="width: 67%" aria-valuenow="67" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>

                    <a href="javascript: void(0);" class="text-reset item-hovered d-block p-2">
                        <p class="text-muted mb-0">New Admin Design<span class="float-end">84%</span></p>
                        <div class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: 84%" aria-valuenow="84" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </a>
                </div>

                <div class="p-3 mt-2 d-grid">
                    <a href="javascript: void(0);" class="btn btn-success waves-effect waves-light">Create Task</a>
                </div>

            </div>

            <div class="tab-pane active" id="settings-tab" role="tabpanel">

                <div class="mt-n3">
                    <h6 class="fw-medium py-2 px-3 font-13 text-uppercase bg-light mx-n3 mt-n3 mb-3">
                        <span class="d-block py-1">Theme Settings</span>
                    </h6>
                </div>

                <div class="alert alert-warning" role="alert">
                    <strong>Customize </strong> the overall color scheme, sidebar menu, etc.
                </div>

                <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Color Scheme</h5>

                <div class="colorscheme-cardradio">
                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-bs-theme" id="layout-color-light" value="light">
                            <label class="form-check-label" for="layout-color-light">Light</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-bs-theme" id="layout-color-dark" value="dark">
                            <label class="form-check-label" for="layout-color-dark">Dark</label>
                        </div>
                    </div>
                </div>

                <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Content Width</h5>
                <div class="d-flex flex-column gap-2">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="data-layout-width" id="layout-width-default" value="default">
                        <label class="form-check-label" for="layout-width-default">Fluid (Default)</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="data-layout-width" id="layout-width-boxed" value="boxed">
                        <label class="form-check-label" for="layout-width-boxed">Boxed</label>
                    </div>
                </div>

                <div id="layout-mode">
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Layout Mode</h5>

                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-layout-mode" id="layout-mode-default" value="default">
                            <label class="form-check-label" for="layout-mode-default">Default</label>
                        </div>


                        <div id="layout-detached">
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" name="data-layout-mode" id="layout-mode-detached" value="detached">
                                <label class="form-check-label" for="layout-mode-detached">Detached</label>
                            </div>
                        </div>
                    </div>
                </div>

                <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Topbar Color</h5>

                <div class="d-flex flex-column gap-2">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="data-topbar-color" id="topbar-color-light" value="light">
                        <label class="form-check-label" for="topbar-color-light">Light</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="data-topbar-color" id="topbar-color-dark" value="dark">
                        <label class="form-check-label" for="topbar-color-dark">Dark</label>
                    </div>

                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" name="data-topbar-color" id="topbar-color-brand" value="brand">
                        <label class="form-check-label" for="topbar-color-brand">Brand</label>
                    </div>
                </div>

                <div>
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Menu Color</h5>

                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-color" id="leftbar-color-light" value="light">
                            <label class="form-check-label" for="leftbar-color-light">Light</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-color" id="leftbar-color-dark" value="dark">
                            <label class="form-check-label" for="leftbar-color-dark">Dark</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-color" id="leftbar-color-brand" value="brand">
                            <label class="form-check-label" for="leftbar-color-brand">Brand</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-color" id="leftbar-color-gradient" value="gradient">
                            <label class="form-check-label" for="leftbar-color-gradient">Gradient</label>
                        </div>
                    </div>
                </div>

                <div id="menu-icon-color">
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Menu Icon Color</h5>

                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-two-column-color" id="twocolumn-menu-color-light" value="light">
                            <label class="form-check-label" for="twocolumn-menu-color-light">Light</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-two-column-color" id="twocolumn-menu-color-dark" value="dark">
                            <label class="form-check-label" for="twocolumn-menu-color-dark">Dark</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-two-column-color" id="twocolumn-menu-color-brand" value="brand">
                            <label class="form-check-label" for="twocolumn-menu-color-brand">Brand</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-two-column-color" id="twocolumn-menu-color-gradient" value="gradient">
                            <label class="form-check-label" for="twocolumn-menu-color-gradient">Gradient</label>
                        </div>
                    </div>
                </div>

                <div>
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Menu Icon Tone</h5>

                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-icon" id="menu-icon-default" value="default">
                            <label class="form-check-label" for="menu-icon-default">Default</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-menu-icon" id="menu-icon-twotone" value="twotones">
                            <label class="form-check-label" for="menu-icon-twotone">Twotone</label>
                        </div>
                    </div>
                </div>

                <div id="sidebar-size">
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Sidebar Size</h5>

                    <div class="d-flex flex-column gap-2">
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-sidenav-size" id="leftbar-size-default" value="default">
                            <label class="form-check-label" for="leftbar-size-default">Default</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-sidenav-size" id="leftbar-size-compact" value="compact">
                            <label class="form-check-label" for="leftbar-size-compact">Compact (Medium Width)</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-sidenav-size" id="leftbar-size-small" value="condensed">
                            <label class="form-check-label" for="leftbar-size-small">Condensed (Icon View)</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-sidenav-size" id="leftbar-size-full" value="full">
                            <label class="form-check-label" for="leftbar-size-full">Full Layout</label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" name="data-sidenav-size" id="leftbar-size-fullscreen" value="fullscreen">
                            <label class="form-check-label" for="leftbar-size-fullscreen">Fullscreen Layout</label>
                        </div>
                    </div>
                </div>

                <div id="sidebar-user">
                    <h5 class="fw-medium font-14 mt-4 mb-2 pb-1">Sidebar User Info</h5>

                    <div class="form-check form-switch">
                        <input type="checkbox" class="form-check-input" name="data-sidebar-user" id="sidebaruser-check">
                        <label class="form-check-label" for="sidebaruser-check">Enable</label>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="offcanvas-footer border-top py-2 px-2 text-center">
        <div class="d-flex gap-2">
            <button type="button" class="btn btn-light w-50" id="reset-layout">Reset</button>
            <a href="https://1.envato.market/uboldadmin" class="btn btn-danger w-50" target="_blank"><i class="mdi mdi-basket me-1"></i> Buy</a>
        </div>
    </div>
</div>