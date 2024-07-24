<!-- ========== Menu ========== -->
<div class="app-menu">  

    <!-- Brand Logo -->
    <div class="logo-box">
        <!-- Brand Logo Light -->
        <a href="index.php" class="logo-light">
            <img src="assets/images/logo-dark-sikola.svg" alt="logo" class="logo-lg">
            <img src="assets/images/logo-unhas.png" alt="small logo" class="logo-sm">
        </a>

        <!-- Brand Logo Dark -->
        <a href="index.php" class="logo-dark">
            <img src="assets/images/logo-sikola.png" alt="dark logo" class="logo-lg">
            <img src="assets/images/logo-unhas.png" alt="small logo" class="logo-sm">
        </a>
    </div>

    <!-- menu-left -->
    <div class="scrollbar">

        <!-- User box -->
        <div class="user-box text-center">
            <img src="assets/images/logo-unhas.png" alt="user-img" title="Mat Helme" class="rounded-circle avatar-md">
            <div class="dropdown">
                <a href="javascript: void(0);" class="dropdown-toggle h5 mb-1 d-block" data-bs-toggle="dropdown"><?php echo $_SESSION['username']; ?></a>
                <div class="dropdown-menu user-pro-dropdown">

                    <!-- <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-user me-1"></i>
                        <span>My Account</span>
                    </a>

                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-settings me-1"></i>
                        <span>Settings</span>
                    </a>

                    <a href="javascript:void(0);" class="dropdown-item notify-item">
                        <i class="fe-lock me-1"></i>
                        <span>Lock Screen</span>
                    </a> -->

                    <!-- item-->
                    <a href="logout.php" class="dropdown-item notify-item">
                        <i class="fe-log-out me-1"></i>
                        <span>Logout</span>
                    </a>

                </div>
            </div>
            <p class="text-muted mb-0">Admin <?php echo $_SESSION['nama_fakultas']; ?></p>
        </div>

        <!--- Menu -->
        <ul class="menu">

           

            <li class="menu-title">Menu</li>

            

            <!-- <li class="menu-item">
                <a href="statistik-mata-kuliah.php" class="menu-link">
                    <span class="menu-icon"><i data-feather="grid"></i></span>
                    <span class="menu-text"> Report </span>
                </a>
            </li> -->

            <li class="menu-item">
                <a href="#menureport" data-bs-toggle="collapse" class="menu-link">
                    <span class="menu-icon"><i data-feather="grid"></i></span>
                    <span class="menu-text"> Report </span>
                    <span class="menu-arrow"></span>
                </a>
                <div class="collapse" id="menureport">
                    <ul class="sub-menu">
                        <li class="menu-item">
                            <a href="statistik-mata-kuliah.php" class="menu-link">
                                <span class="menu-text">Statistik Matakuliah</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="presensi-mk.php" class="menu-link">
                                <span class="menu-text">Presensi Matakuliah</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="nilai-mk.php" class="menu-link">
                                <span class="menu-text">Nilai Matakuliah</span>
                            </a>
                        </li>
                        <li class="menu-item">
                            <a href="log-mahasiswa.php" class="menu-link">
                                <span class="menu-text">Log Mahasiswa</span>
                            </a>
                        </li>
                        
                    </ul>
                </div>
            </li>

        </ul>
        <!--- End Menu -->
        <div class="clearfix"></div>
    </div>
</div>
<!-- ========== Left menu End ========== -->