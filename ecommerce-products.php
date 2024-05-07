
<?php include 'partials/main.php'; ?>

<head>
    <?php
    $title = "Ecommerce Products";
    include 'partials/title-meta.php'; ?>

	   <?php include 'partials/head-css.php'; ?>
    </head>

    <body>

        <!-- Begin page -->
        <div id="wrapper">

            <?php include 'partials/menu.php'; ?>

            <!-- ============================================================== -->
            <!-- Start Page Content here -->
            <!-- ============================================================== -->

            <div class="content-page">

                <?php include 'partials/topbar.php'; ?>

                <div class="content">

                    <!-- Start Content-->
                    <div class="container-fluid">
                        
                        <?php
$sub_title = "Ecommerce";$title = "Products";
include 'partials/page-title.php'; ?>

                        <div class="row">
                            <div class="col-12">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="row justify-content-between">
                                            <div class="col-auto">
                                                <form class="d-flex flex-wrap align-items-center">
                                                    <label for="inputPassword2" class="visually-hidden">Search</label>
                                                    <div class="me-3">
                                                        <input type="search" class="form-control my-1 my-lg-0" id="inputPassword2" placeholder="Search...">
                                                    </div>
                                                    <label for="status-select" class="me-2">Sort By</label>
                                                    <div class="me-sm-3">
                                                        <select class="form-select my-1 my-lg-0" id="status-select">
                                                            <option selected="">All</option>
                                                            <option value="1">Popular</option>
                                                            <option value="2">Price Low</option>
                                                            <option value="3">Price High</option>
                                                            <option value="4">Sold Out</option>
                                                        </select>
                                                    </div>
                                                </form>
                                            </div>
                                            <div class="col-auto">
                                                <div class="text-lg-end my-1 my-lg-0">
                                                    <button type="button" class="btn btn-success waves-effect waves-light me-1"><i class="mdi mdi-cog"></i></button>
                                                    <a href="ecommerce-product-edit.html" class="btn btn-danger waves-effect waves-light"><i class="mdi mdi-plus-circle me-1"></i> Add New</a>
                                                </div>
                                            </div><!-- end col-->
                                        </div> <!-- end row -->
                                    </div>
                                </div> <!-- end card -->
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->

                        <div class="row">
                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-1.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Jones Men's T-shirt (Blue)</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 98 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $39
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-2.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Brown Hoodie for men</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 23 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $98
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-3.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Designer Awesome T-Shirt</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 235 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $49
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-4.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Jones Awesome T-Shirt</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 385 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $29
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-5.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Green Hoodie for men</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 25 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $49
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-6.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Blue Awesome T-Shirt</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 39 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $19
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-7.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Jones Men's T-shirt (Green)</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 36 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $99
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->

                            <div class="col-md-6 col-lg-4 col-xl-3">
                                <div class="card product-box">
                                    <div class="card-body">
                                        <div class="product-action">
                                            <a href="javascript: void(0);" class="btn btn-success btn-xs waves-effect waves-light"><i class="mdi mdi-pencil"></i></a>
                                            <a href="javascript: void(0);" class="btn btn-danger btn-xs waves-effect waves-light"><i class="mdi mdi-close"></i></a>
                                        </div>
    
                                        <div class="bg-light">
                                            <img src="assets/images/products/product-8.png" alt="product-pic" class="img-fluid" />
                                        </div>
    
                                        <div class="product-info">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h5 class="font-16 mt-0 sp-line-1"><a href="ecommerce-product-detail.html" class="text-dark">Red Hoodie for men</a> </h5>
                                                    <div class="text-warning mb-2 font-13">
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <h5 class="m-0"> <span class="text-muted"> Stocks : 128 pcs</span></h5>
                                                </div>
                                                <div class="col-auto">
                                                    <div class="product-price-tag">
                                                        $29
                                                    </div>
                                                </div>
                                            </div> <!-- end row -->
                                        </div> <!-- end product info-->
                                    </div>
                                </div> <!-- end card-->
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->

                        <div class="row">
                            <div class="col-12">
                                <ul class="pagination pagination-rounded justify-content-end mb-3">
                                    <li class="page-item">
                                        <a class="page-link" href="javascript: void(0);" aria-label="Previous">
                                            <span aria-hidden="true">«</span>
                                            <span class="visually-hidden">Previous</span>
                                        </a>
                                    </li>
                                    <li class="page-item active"><a class="page-link" href="javascript: void(0);">1</a></li>
                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">2</a></li>
                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">3</a></li>
                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">4</a></li>
                                    <li class="page-item"><a class="page-link" href="javascript: void(0);">5</a></li>
                                    <li class="page-item">
                                        <a class="page-link" href="javascript: void(0);" aria-label="Next">
                                            <span aria-hidden="true">»</span>
                                            <span class="visually-hidden">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </div> <!-- end col-->
                        </div>
                        <!-- end row-->
                        
                    </div> <!-- container -->

                </div> <!-- content -->

                <?php include 'partials/footer.php'; ?>

            </div>

            <!-- ============================================================== -->
            <!-- End Page content -->
            <!-- ============================================================== -->


        </div>
        <!-- END wrapper -->

        <?php include 'partials/right-sidebar.php'; ?>
        
        <?php include 'partials/footer-scripts.php'; ?>

    </body>
</html>