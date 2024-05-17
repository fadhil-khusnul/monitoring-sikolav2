var tableStatistik = $("#table_statistik_matkul").DataTable({

    // stateSave: true,
    scrollX: true,
    lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    pageLength: 15,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],

    language: {
        paginate: {
            previous: "<i class='mdi mdi-chevron-left'>",
            next: "<i class='mdi mdi-chevron-right'>"
        }
    },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
    }
});


let activeSemester = "TA232"
let active = "2023/2024 Genap"

// var chart;

const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)


function get_prodi(params) {
    tableStatistik.clear().draw();

    fetch('assets/data/get_all_prodi.json')
        .then(response => response.json())
        .then(data => {
            let groups = {};

            data.forEach(item => {
                const fakultasId = item.fakultas.id;
                if (!groups[fakultasId]) {
                    groups[fakultasId] = [];
                }
                groups[fakultasId].push(item);
            });

            const select = document.getElementById("program_studi");

            for (let fakultasId in groups) {
                const group = groups[fakultasId];
                const optgroup = document.createElement("optgroup");
                optgroup.label = group[0].fakultas.nama_resmi;
                const fakultas_2 = group[0].fakultas.nama_resmi;



                group.forEach(item => {
                    const option = document.createElement("option");
                    option.value = item.nama_resmi;
                    option.text = item.nama_resmi;
                    option.setAttribute('data_fakultas', fakultas_2);
                    option.setAttribute('id_prodi', item.id);

                    optgroup.appendChild(option);
                });

                select.appendChild(optgroup);
            }
            $("#loader").removeClass("d-none").addClass("d-flex")


            $(select).on("change", function(e) {
                $("#apex-column-2").html("")
                $("#apex-pie-1").html("")
                const paramsOptions = params.options[params.selectedIndex];
                const mk_aktif = paramsOptions.getAttribute('mk_aktif');



                $("#judul_prodi").html("")





                let counter = 1;


                const requestOptions = {
                    method: "GET",
                    redirect: "follow"
                };

                const selectedOption = this.options[this.selectedIndex];
                const nama_prodi = this.options[this.selectedIndex].value;
                const id_prodi = selectedOption.getAttribute('id_prodi');
                $("#judul_prodi").html(nama_prodi)

                console.log(nama_prodi, id_prodi);

                select_mk_fun(id_prodi, nama_prodi, selectedOption, requestOptions, counter, mk_aktif)

            })
        });

}
// let chart;

function select_mk_fun(id_prodi, nama_prodi, selectedOption, requestOptions, counter, mk_aktif) {
    console.log(mk_aktif);
    $("#select_mk").empty();




    tableStatistik.clear().draw();


    fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
        .then((response) => response.json())
        .then(result => {
            console.log(result[0].id)
            fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
                .then((response) => response.json())
                .then(dataCourses => {

                    let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

                    let totalBanyakTerisi = 0;

                    let totalRps = 0;
                    let totalProyek = 0;
                    let totalTugas = 0;
                    let totalKasus = 0;
                    let totalDoc = 0;
                    let totalSurvey = 0;
                    let totalQuiz = 0;
                    let totalForum = 0;


                    const fetchPromises = filteredCourses.map(item => {
                        return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {

                                let urls = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "url").length;
                                }).reduce((total, current) => total + current, 0);

                                totalKasus += urls

                                let files = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                                }).reduce((total, current) => total + current, 0);

                                totalDoc += files

                                let forums = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "forum").length;
                                }).reduce((total, current) => total + current, 0);

                                totalForum += forums



                                let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                                let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);

                                totalBanyakTerisi += banyakTerisi.length

                                let tugas = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "assign").length;
                                }).reduce((total, current) => total + current, 0);

                                totalTugas += tugas

                                let surveys = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "survey").length;
                                }).reduce((total, current) => total + current, 0);

                                totalSurvey += surveys

                                let quizes = result.map(section => {
                                    return section.modules.filter(modul => modul.modname === "quiz").length;
                                }).reduce((total, current) => total + current, 0);

                                totalQuiz += quizes



                                let infoMK = result.filter(alur => alur.name === "Info Matakuliah");
                                let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                                totalRps += rps.length

                                let attendanceModules = [];

                                infoMK.forEach(section => {
                                    section.modules.forEach(modul => {
                                        if (modul.modname === "attendance") {
                                            attendanceModules.push(modul);
                                        }

                                    });
                                });
                                let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");


                                const namaDosen = await getUserDosen(absenDosen, requestOptions);
                                console.log(namaDosen, "NAMA DOSENN");

                                const namaDosenListItems = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');

                                // Wrap the &lt;li&gt; elements in an &lt;ol&gt; tag
                                const namaDosenHtml = `<ol>${namaDosenListItems}</ol>`;



                                tableStatistik.row.add([
                                    counter++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    banyakTerisi.length,
                                    banyakAlur.length,
                                    rps.length,
                                    tugas,
                                    tugas,
                                    urls,
                                    files,
                                    surveys,
                                    quizes,
                                    forums,
                                    `${namaDosenHtml}`,
                                    `
                                    <a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a>
                                    <br>
                                    <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>
                                    
                                    `,
                                ]).draw(false);

                            })
                            .catch((error) => console.error(error));



                    });


                    Promise.all(fetchPromises).then(() => {
                        console.log(totalBanyakTerisi, "BNAYY");
                        grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);
                    });
                    $("#loader").removeClass("d-flex").addClass("d-none")


                })
                .catch((error) => console.error(error));
        })
        .catch(error => {
            console.error(error);
            $("#loader").removeClass("d-flex").addClass("d-none")

        });



    fetch_mk(mk_aktif, id_prodi, requestOptions)





}

async function getUserDosen(absenDosen, requestOptions) {
    try {
        console.log(absenDosen, "ABS");
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions);
        const result = await response.json();
        const namaDosen = result[0].users;
        return namaDosen;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi) {
    $("#apex-column-2").html("")
    $("#apex-pie-1").html("")

    // if (chart) {
    //     chart.destroy(); // Destroy the previous chart instance
    // }
    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-column-2").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 380,
            type: "bar",
            zoom: { enabled: !0 },
            toolbar: { show: !0 }
        },
        plotOptions: {
            bar: {
                dataLabels: { position: "top" },
                distributed: true
            }
        },
        dataLabels: {
            enabled: !0,
            offsetY: -30,
            style: { fontSize: "12px", colors: ["#304758"] }
        },
        // stroke: { width: [3, 3], curve: "smooth" },
        colors: colors,
        series: [{
            name: "Total",

            // type: 'bar',
            data: [totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum]
        }, ],

        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Proyek", "Tugas", "Kasus/Url", "Doc", "Survey", "Quiz", "Forum"],

        xaxis: {
            // categories: ["Alur Pembelajaran (Terisi)", "RPS", "Proyek", "Tugas", "Kasus/Url", "Doc", "Survey", "Quiz", "Forum"],
            axisBorder: { show: !0 },
            axisTicks: { show: !0 },
            crosshairs: {
                fill: {
                    type: "gradient",
                    gradient: {
                        colorFrom: "#D8E3F0",
                        colorTo: "#BED1E6",
                        stops: [0, 100],
                        opacityFrom: .4,
                        opacityTo: .5
                    }
                }
            },
            tooltip: { enabled: !1, offsetY: -35 }
        },
        fill: { gradient: { enabled: !1, shade: "light", type: "horizontal", shadeIntensity: .25, gradientToColors: void 0, inverseColors: !0, opacityFrom: 1, opacityTo: 1, stops: [50, 0, 100, 100] } },
        yaxis: {
            axisBorder: { show: !0 },
            axisTicks: { show: !0 },
            labels: { show: !0 },
        },
        title: {
            text: nama_prodi,
            align: "center",
            style: { color: "#444" }
        },
        // legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },

        grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa" }
    };

    chart = new ApexCharts(document.querySelector("#apex-column-2"), options);
    chart.render();


    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-pie-1").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 380,
            type: "pie",
            zoom: { enabled: !0 },
            toolbar: { show: !0 }
        },
        title: {
            text: nama_prodi,
            align: "center",
            style: { color: "#444" }
        },
        series: [totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum],
        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Proyek", "Tugas", "Kasus/Url", "Doc", "Survey", "Quiz", "Forum"],
        colors: colors,
        legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },
        responsive: [{ breakpoint: 600, options: { chart: { height: 240 }, legend: { show: !1 } } }]
    };
    (chart = new ApexCharts(document.querySelector("#apex-pie-1"), options)).render();

    // chart.destroy(); // Destroy the previous chart instance

    // chart.destroy()
}


function fetch_mk(mk_aktif, id_prodi, requestOptions) {
    tableStatistik.clear().draw();

    // console.log("MK AKTIFF", id_prodi);

    fetch('assets/data/list_mk.json').then(response => response.json())
        .then(data => {

            const select_mk = document.getElementById("select_mk");

            const default_Mk = document.createElement("option")
            default_Mk.text = "Pilih Mk"
            default_Mk.setAttribute("value", "")
            default_Mk.setAttribute("disabled", "true")
            default_Mk.setAttribute("selected", "true")
            select_mk.appendChild(default_Mk)

            const listAktif = data.filter(mk => mk.nama_category_periode_sikola === mk_aktif)
            const listMk = listAktif.filter(mk => mk.id_prodi == id_prodi)


            listMk.forEach(mk => {
                const option = document.createElement('option');
                option.setAttribute('data_kode_matkul', mk.kode_matkul);
                option.setAttribute('nama_prodi', mk.nama_prodi);
                option.setAttribute('fullname_sikola', mk.fullname_sikola);
                option.value = mk.idnumber_sikola;
                option.text = mk.fullname_sikola;
                select_mk.appendChild(option);

            })


            // console.log(listMk);
            $("#loader").removeClass("d-none").addClass("d-flex")

            $(select_mk).off("change");
            $(select_mk).on("change", function(e) {
                // $("#loader").removeClass("d-none").addClass("d-flex")

                const selectedOption = this.options[this.selectedIndex];
                const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
                const nama_prodi = selectedOption.getAttribute('nama_prodi');
                const fullname_sikola = selectedOption.getAttribute('fullname_sikola');

                // $("#program_studi").val(null).trigger("change");
                $("#judul_prodi").html("")


                $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
                console.log(selectedKodeMatkul);

                tableStatistik.clear().draw();

                fetch('assets/data/list_mk_per_kelas.json')
                    .then(response => response.json())
                    .then(data => {
                        console.log(selectedKodeMatkul);

                        let counter = 1;

                        const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

                        console.log(filteredData);

                        const fetchPromises = filteredData.map(item => {
                            console.log(item.shortname_sikola);
                            return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                                .then((response) => response.json())
                                .then(data => {
                                    return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${data.courses[0].id}`, requestOptions)
                                        .then((response) => response.json())
                                        .then(async result => {
                                            let urls = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "url").length;
                                            }).reduce((total, current) => total + current, 0);

                                            let files = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length;
                                            }).reduce((total, current) => total + current, 0);

                                            let forums = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "forum").length;
                                            }).reduce((total, current) => total + current, 0);

                                            let banyakAlur = result.filter(alur => alur.name !== "Info Matakuliah");
                                            let banyakTerisi = banyakAlur.filter(alur => alur.modules && alur.modules.length > 0);
                                            // totalBanyakTerisi += banyakTerisi.length;

                                            let tugas = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "assign").length;
                                            }).reduce((total, current) => total + current, 0);
                                            let surveys = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "survey").length;
                                            }).reduce((total, current) => total + current, 0);
                                            let quizes = result.map(section => {
                                                return section.modules.filter(modul => modul.modname === "quiz").length;
                                            }).reduce((total, current) => total + current, 0);

                                            console.log(files);

                                            let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
                                            let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                                            let attendanceModules = [];

                                            infoMK.forEach(section => {
                                                section.modules.forEach(modul => {
                                                    if (modul.modname === "attendance") {
                                                        attendanceModules.push(modul);
                                                    }

                                                });
                                            });
                                            let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");


                                            const namaDosen = await getUserDosen(absenDosen, requestOptions);
                                            console.log(namaDosen, "NAMA DOSENN");

                                            const namaDosenListItems = namaDosen.map(dosen => `<li>${dosen.firstname} ${dosen.lastname}</li>`).join('');

                                            // Wrap the &lt;li&gt; elements in an &lt;ol&gt; tag
                                            const namaDosenHtml = `<ol>${namaDosenListItems}</ol>`;

                                            tableStatistik.row.add([
                                                counter++,
                                                `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${data.courses[0].id}" target="_blank" class="">${data.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                banyakTerisi.length,
                                                banyakAlur.length,
                                                rps.length,
                                                tugas,
                                                tugas,
                                                urls,
                                                files,
                                                surveys,
                                                quizes,
                                                forums,
                                                namaDosenHtml,
                                                `
                                                <a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${data.courses[0].id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a>
                                                <br>
                                                <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${data.courses[0].id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>
                                                
                                                `
                                            ]).draw(false);
                                        })
                                        .catch((error) => console.error(error));
                                })
                                .catch(error => {
                                    console.error(error)
                                });
                        });

                        Promise.all(fetchPromises).then(() => {

                        });



                        $("#loader").removeClass("d-flex").addClass("d-none")


                    })
                    .catch(error => {
                        $("#loader").removeClass("d-flex").addClass("d-none")


                        console.error('Error loading JSON file:', error)
                    });
            });



        }).catch(error => {
            console.log(error)

        })



}


colors = ["#077AC3", "#1abc9c", "#f672a7"];
(dataColors = $("#apex-mixed-2").data("colors")) && (colors = dataColors.split(","));
options = {
    chart: {
        height: 380,
        type: "bar",
        toolbar: {
            show: !1
        }
    },

    plotOptions: {
        bar: {
            columnWidth: "50%",
            dataLabels: { position: "top" }
        }
    },
    dataLabels: {
        enabled: !0
    },
    colors: colors,
    series: [{
            name: "Team A",
            type: "column",
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
            name: "Team B",
            type: "area",
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
            name: "Team C",
            type: "line",
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
    ],
    fill: {
        opacity: [.85, .25, 1],
        gradient: { inverseColors: !1, shade: "light", type: "vertical", opacityFrom: .85, opacityTo: .55, stops: [0, 100, 100, 100] }
    },
    labels: ["01/01/2003", "02/01/2003", "03/01/2003", "04/01/2003", "05/01/2003", "06/01/2003", "07/01/2003", "08/01/2003", "09/01/2003", "10/01/2003", "11/01/2003"],
    markers: { size: 0 },
    legend: { offsetY: 7 },
    xaxis: { type: "datetime" },
    yaxis: { title: { text: "Points" } },
    tooltip: {
        shared: !0,
        intersect: !1,
        y: {
            formatter: function(e) { return void 0 !== e ? e.toFixed(0) + " points" : e }
        }
    },
    grid: { borderColor: "#f1f3fa", padding: { bottom: 10 } }
};
(
    chart = new ApexCharts(document.querySelector("#apex-mixed-2"), options)).render();