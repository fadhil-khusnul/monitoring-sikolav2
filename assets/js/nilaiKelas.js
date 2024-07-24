let tableStatistik = $("#table_nilai").DataTable({
    // responsive: true,
    // stateSave: true,
    // lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    // pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],
    scrollX: !0,
    fixedHeader: true,
    createdRow: function(row, data, dataIndex) {
        // Set the fourth column to be centered
        $('td', row).eq(3).addClass('text-center');
    },

    language: { paginate: { previous: "<i class='mdi mdi-chevron-left'>", next: "<i class='mdi mdi-chevron-right'>" } },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded")
    }

});



let activeSemester = "TA232"
let active = "2023/2024 Genap"

let id_fakultas = document.getElementById("id_fakultas").value;

const selectSemester = document.getElementById("semester_select")

optionDefault = document.createElement("option")
optionDefault.value = 72
optionDefault.text = "2023/2024 (20232/GENAP)"
optionDefault.setAttribute('ta_semester', "TA232");
optionDefault.setAttribute("mk_aktif", active);

selectSemester.appendChild(optionDefault)





let nama_prodi_storage = localStorage.getItem('nama_prodi_storage');
const id_prodi_storage = localStorage.getItem('id_prodi_storage');
let semester_aktif_storage = localStorage.getItem('semester_aktif_storage');
let mk_value_storage = localStorage.getItem('mk_value_storage');
let isFilterCleared = false;
if (semester_aktif_storage) {
    $('#semester_select').val(semester_aktif_storage).trigger('change');
}
async function semester_select_fun() {
    if (isFilterCleared) {
        return;
    }
    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    const select = document.getElementById("program_studi");
    const semester_select = document.getElementById("semester_select");
    const selectedOption = semester_select.options[semester_select.selectedIndex];
    console.log(selectedOption);

    console.log(id_fakultas);
    if (id_fakultas > 0) {
        const listProdi = data.filter(prodi => prodi.fakultas.id === parseInt(id_fakultas))
        console.log(listProdi);
        listProdi.forEach(item => {
            const option = document.createElement("option");
            option.value = item.nama_resmi;
            option.text = item.nama_resmi;
            option.setAttribute('data_fakultas', item.fakultas.nama_resmi);
            option.setAttribute('id_prodi', item.id);


            select.appendChild(option);
        });


    } else {
        let groups = {};
        data.forEach(item => {
            const fakultasId = item.fakultas.id;
            if (!groups[fakultasId]) {
                groups[fakultasId] = [];
            }
            groups[fakultasId].push(item);
        });

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

    }


    if (nama_prodi_storage) {

        $('#program_studi').val(nama_prodi_storage).trigger('change');


    }


}
async function prodi_select_fun() {


    $("#filter_data").removeAttr("disabled")

    const program_studi = document.getElementById("program_studi")

    const selectedOption = program_studi.options[program_studi.selectedIndex];
    // console.log(selectedOption);
    const nama_prodi = selectedOption.value;
    const id_prodi = selectedOption.getAttribute('id_prodi');
    console.log(nama_prodi, id_prodi);

    localStorage.setItem('nama_prodi_storage', nama_prodi);


    // nama_prodi_storage = null


    const response = await fetch('assets/data/list_mk.json');
    const data = await response.json()

    const select_mk = document.getElementById("select_mk");

    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `Select MK Prodi - ${nama_prodi}`
    default_Mk.setAttribute("value", "")
    default_Mk.setAttribute("disabled", "true")
    default_Mk.setAttribute("selected", "true")
    select_mk.appendChild(default_Mk)
    select_mk.dispatchEvent(new Event('change'));

    const listAktif = data.filter(mk => mk.nama_category_periode_sikola === active)
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


    if (isFilterCleared) {
        return;
    }

    if (nama_prodi_storage && !mk_value_storage) {
        // $('#program_studi').val(nama_prodi_storage).trigger('change');

        // console.log("1111");
        filter_data();
        nama_prodi_storage = null;
        // localStorage.removeItem('nama_prodi_storage'); // Remove from localStorage
        // Reset mk_value_storage

    } else if (nama_prodi_storage && mk_value_storage) {
        // console.log("222");
        $('#select_mk').val(mk_value_storage).trigger('change');
        filter_data();
        // nama_prodi_storage = null; // Reset mk_value_storage
        mk_value_storage = null; // Reset mk_value_storage
        localStorage.removeItem('mk_value_storage'); // Remove from localStorage

    }



    // nama_prodi_storage = null;

}

async function filter_data() {

    if (isFilterCleared) {
        return;
    }
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    const myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer cd1920ad4e4c101c79313ba9a8e4aefa36be678d90b33fae894063792bc9d78");

    const requestOptionsNilai = {
        method: "GET",
        // headers: myHeaders,
        redirect: "follow"
    };
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1").html("")
    tableStatistik.clear().draw();


    let nama_prodi = document.getElementById("program_studi").value
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');

    localStorage.setItem('nama_prodi_storage', nama_prodi)
    localStorage.setItem('id_prodi_storage', id_prodi)
    localStorage.setItem('semester_aktif_storage', semester_aktif)



    const select_mk = document.getElementById("select_mk");

    const selectedOption = select_mk.options[select_mk.selectedIndex];
    const mk_value = selectedOption.value
    const selectedKodeMatkul = selectedOption.getAttribute('data_kode_matkul');
    const fullname_sikola = selectedOption.getAttribute('fullname_sikola');


    if (!selectedKodeMatkul && !fullname_sikola) {

        try {
            $("#judul_prodi").html(nama_prodi)
            $("#judul_prodi_mhs").html(nama_prodi)
            $("#judul_prodi_e").html(nama_prodi)

            const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
            const result = await response.json();
            const response1 = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
            const dataCourses = await response1.json()

            let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

            counter = 1
            counter_e = 1
            counter_m = 1


            let totalSinkron = 0;
            let totalTidakSinkron = 0;


            const fetchPromises = filteredCourses.map(item => {
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                    .then((response) => response.json())
                    .then(async result => {
                        return fetch(`/services/sikola_connect.php?courseId=${item.id}`, requestOptionsNilai)
                            .then(response => response.json())
                            .then(async getNilai => {
                                let kursusSinkron = false;

                                console.log(getNilai);
                                // Check if getNilai is not empty and status is defined
                                if (getNilai.length > 0 && getNilai[0].status) {
                                    if (getNilai[0].status === 1) {
                                        kursusSinkron = true;
                                    }
                                }
                                if (kursusSinkron) {
                                    totalSinkron++;
                                } else {
                                    totalTidakSinkron++;
                                }

                                let badge = kursusSinkron ? `<div class="badge label-table bg-success">Sinkron</div>` : `<div class="badge label-table bg-danger">Belum Sinkron</div>`;

                                tableStatistik.row.add([
                                    counter++,
                                    `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    badge,
                                    `<a href="https://sikola-v2.unhas.ac.id/grade/report/grader/index.php?id=${item.id}" target="_blank" style="text-align:center;" class="text-center">Penilaian Mahasiswa <i class="fe-external-link"></i></a>`
                                ]).draw(false);
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    })
                    .catch(error => {
                        console.error(error);
                        console.log(item.fullname, "INF");
                    });
            });

            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none");
                $("#clear_filter").removeAttr("disabled");
                $("#filter_data").removeAttr("disabled");

                console.log(totalSinkron, totalTidakSinkron, nama_prodi);

                grafik_statistik(totalSinkron, totalTidakSinkron, nama_prodi);
            });



        } catch (error) {

            console.log(error);

        }
    } else {
        try {
            localStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            localStorage.setItem('fullname_sikola_storage', fullname_sikola)
            localStorage.setItem('mk_value_storage', mk_value)
            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)

            const response = await fetch(`assets/data/list_mk_per_kelas.json`)
            const data = await response.json()

            let totalSinkron = 0;
            let totalTidakSinkron = 0;


            counter = 1
            counter_e = 1
            counter_m = 1

            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(kelas => {
                        return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${kelas.courses[0].id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {
                                return fetch(`/services/sikola_connect.php?courseId=${kelas.courses[0].id}`, requestOptions)
                                    .then(response => response.json())
                                    .then(async getNilai => {
                                        let kursusSinkron = false;
                                        // Check if getNilai is not empty and status is defined
                                        if (getNilai.length > 0 && getNilai[0].status) {
                                            if (getNilai[0].status === 1) {
                                                kursusSinkron = true;
                                            }
                                        }
                                        if (kursusSinkron) {
                                            totalSinkron++;
                                        } else {
                                            totalTidakSinkron++;
                                        }

                                        let badge = kursusSinkron ? `<div class="badge label-table bg-success">Sinkron</div>` : `<div class="badge label-table bg-danger">Belum Sinkron</div>`;

                                        tableStatistik.row.add([
                                            counter++,
                                            `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                            badge,
                                            `<a href="https://sikola-v2.unhas.ac.id/grade/report/grader/index.php?id=${kelas.courses[0].id}" target="_blank" style="text-align:center;" class="text-center">Penilaian Mahasiswa <i class="fe-external-link"></i></a>`
                                        ]).draw(false);
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    });





                            })
                            .catch(error => {

                                console.error(error)

                            });

                    })
                    .catch(error => {

                        console.error(error)
                    });




            });

            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none");
                $("#clear_filter").removeAttr("disabled");
                $("#filter_data").removeAttr("disabled");

                grafik_statistik(totalSinkron, totalTidakSinkron, nama_prodi);




            });


        } catch (error) {
            console.log(error);

        }
    }





}

const clear_filter = async() => {
    isFilterCleared = true; // Setel flag menjadi true

    const chartElement = document.querySelector('#apex-pie-1');
    if (chartElement && chartElement._chartInstance) {
        console.log(chartElement._chartInstance);
        chartElement._chartInstance.destroy();
    }

    const chartElement2 = document.querySelector('#apex-column-2');
    if (chartElement2 && chartElement2._chartInstance) {
        console.log(chartElement2._chartInstance);
        chartElement2._chartInstance.destroy();
    }

    semester_aktif_storage = null
    localStorage.removeItem('nama_prodi_storage');
    localStorage.removeItem('id_prodi_storage');
    localStorage.removeItem('semester_aktif_storage');
    localStorage.removeItem('selectedKodeMatkul_storage');
    localStorage.removeItem('fullname_sikola_storage');
    localStorage.removeItem('mk_value_storage');
    localStorage.removeItem('mk_aktif');


    $("#judul_prodi").html("")
    $("#filter_data").attr("disabled", true)

    tableStatistik.clear().draw();

    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}

async function grafik_statistik(totalSinkron, totalTidakSinkron, nama_prodi) {

    const chartElement = document.querySelector('#apex-pie-1');
    if (chartElement && chartElement._chartInstance) {
        chartElement._chartInstance.destroy();
    }


    colors = ["#00e396", "#ff4560"];
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
        series: [totalSinkron, totalTidakSinkron],
        labels: ["Nilai Sinkron", "Nilai Belum Sinkron"],
        colors: colors,
        legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },
        responsive: [{ breakpoint: 600, options: { chart: { height: 240 }, legend: { show: !1 } } }]
    };
    (chart = new ApexCharts(document.querySelector("#apex-pie-1"), options)).render();

    document.querySelector("#apex-pie-1")._chartInstance = chart;


}