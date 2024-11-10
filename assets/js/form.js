
var scrollPosition = 0;
var tableStatistik = $("#table_statistik_matkul").DataTable({

    // stateSave: true,
    scrollX: true,
    // lengthChange: true, // Atur ke true untuk mengaktifkan opsi perubahan jumlah baris per halaman
    dom: '<"dtsp-verticalContainer"<"dtsp-verticalPanes"P><"dtsp-dataTable"Bfrtip>>',
    pageLength: 10,
    buttons: [

        { extend: 'copy', },
        { extend: 'csv' },
    ],

    preDrawCallback: function(settings) {
        // Simpan posisi scroll saat ini sebelum tabel di-draw ulang
        scrollPosition = $(window).scrollTop();
    },

    language: {
        paginate: {
            previous: "<i class='mdi mdi-chevron-left'>",
            next: "<i class='mdi mdi-chevron-right'>"
        }
    },
    drawCallback: function() {
        $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
        $(window).scrollTop(scrollPosition);
    }
});



let id_fakultas = document.getElementById("id_fakultas").value;

let nama_prodi_storage = localStorage.getItem('nama_prodi_storage');
const id_prodi_storage = localStorage.getItem('id_prodi_storage');
let semester_aktif_storage = localStorage.getItem('semester_aktif_storage');
let mk_value_storage = localStorage.getItem('mk_value_storage');
let isFilterCleared = false; 
if (mk_value_storage) {
    $('#semester_select').val(mk_value_storage).trigger('change');
}


fetch('assets/data/listSemesters.json').then(res => res.json()).then(data => {
    let semester_select = document.getElementById('semester_select');
    data.semesters.forEach(sms => {
        const option = document.createElement("option");
        option.value = sms.id;
        const ta_semester = sms.kode.slice(2);
        option.text = `${sms.tahun_ajaran} (${sms.kode} - ${sms.jenis.toUpperCase()})`;
        option.setAttribute('ta_semester', `TA${ta_semester}`);
        option.setAttribute('mk_aktif', `${sms.tahun_ajaran} ${sms.jenis.charAt(0).toUpperCase() + sms.jenis.slice(1).toLowerCase()}`);
        
        semester_select.appendChild(option);
    })
}).catch(error => console.error('Error loading JSON file:', error));


async function semester_select_fun() {
    if (isFilterCleared) {
        return;
    }


    localStorage.removeItem('nama_prodi_storage');
    localStorage.removeItem('id_prodi_storage');
    localStorage.removeItem('semester_aktif_storage');
    localStorage.removeItem('selectedKodeMatkul_storage');
    localStorage.removeItem('fullname_sikola_storage');
    localStorage.removeItem('mk_value_storage');
    localStorage.removeItem('mk_aktif');

    $('#select_mk').val("").trigger('change');
    $('#program_studi').val("").trigger('change');

    const semester_select = $('#semester_select').select2('data');
    active = semester_select[0].element.getAttribute('mk_aktif');
    ta_semester = semester_select[0].element.getAttribute('ta_semester');
    const select_mk = document.getElementById("select_mk");
    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `${ta_semester}`



    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    const select = document.getElementById("program_studi");

    console.log(id_fakultas);
    if (id_fakultas > 0) {
        const listProdi = data.filter(prodi => prodi.fakultas.id === parseInt(id_fakultas) &&  !prodi.nama_resmi.toLowerCase().includes("hapus"))
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
            if (!item.nama_resmi.toLowerCase().includes("hapus")) { // Tambahkan filter di sini juga
                groups[fakultasId].push(item);
            }
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
    $('#select_mk').val("").trigger('change');


    const program_studi = document.getElementById("program_studi")

    const selectedOption = program_studi.options[program_studi.selectedIndex];

    const nama_prodi = selectedOption.value;
    const id_prodi = selectedOption.getAttribute('id_prodi');

    localStorage.setItem('nama_prodi_storage', nama_prodi);


    
    let active = localStorage.getItem('mk_aktif');
    let ta_semester = localStorage.getItem('ta_semester');
    
    if (!active) {
        const semester_select = $('#semester_select').select2('data');
        active = semester_select[0].element.getAttribute('mk_aktif');
        ta_semester = semester_select[0].element.getAttribute('ta_semester');
    }







    const response = await fetch(`assets/data/list_mk_${ta_semester}.json`);
    const data = await response.json()

    const select_mk = document.getElementById("select_mk");

    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `${ta_semester} - ${nama_prodi}`
    default_Mk.setAttribute("value", "")
    default_Mk.setAttribute("disabled", "true")
    default_Mk.setAttribute("selected", "true")
    select_mk.appendChild(default_Mk)
    select_mk.dispatchEvent(new Event('change'));


    localStorage.setItem('ta_semester', ta_semester);
    localStorage.setItem('mk_aktif', active);
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

    console.log(active, "active");


    if (isFilterCleared) {
        return;
    }

    if (nama_prodi_storage && !mk_value_storage) {
        filter_data();
        nama_prodi_storage = null;
       

    } else if (nama_prodi_storage && mk_value_storage) {
        $('#select_mk').val(mk_value_storage).trigger('change');
        filter_data();
        mk_value_storage = null; 

        localStorage.removeItem('mk_value_storage'); 
    }

}



async function filter_data() {

    if (isFilterCleared) {
        return;
    }

    console.log("FILTERR");
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1, #apex-column-1").html("")
    tableStatistik.clear().draw();

    let nama_prodi = document.getElementById("program_studi").value
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');
    console.log("NAMA PRODI", id_prodi, nama_prodi);

    localStorage.setItem('nama_prodi_storage', nama_prodi)
    localStorage.setItem('id_prodi_storage', id_prodi)
    localStorage.setItem('semester_aktif_storage', semester_aktif)



    const select_mk = $('#select_mk').select2('data');

    

    const mk_value = select_mk[0].id;
    const selectedKodeMatkul = select_mk[0].element?.getAttribute('data_kode_matkul');
    const fullname_sikola = select_mk[0].element?.getAttribute('fullname_sikola');


    if (!selectedKodeMatkul && !fullname_sikola) {

        const semester_select = document.getElementById("semester_select");
        const selectedOption = semester_select.options[semester_select.selectedIndex];
       
        const activeSemester = selectedOption.getAttribute('ta_semester');

        


        try {
            $("#judul_prodi").html(`${nama_prodi}`)
            $("#ajaran").html(`${activeSemester}`)

            const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
            const result = await response.json();
            const response1 = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
            const dataCourses = await response1.json()

            let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

            let totalBanyakTerisi = 0;

            const dataSouceTable = [];



            let totalRps = 0;
            let totalProyek = 0;
            let totalTugas = 0;
            let totalKasus = 0;
            let totalDoc = 0;
            let totalSurvey = 0;
            let totalQuiz = 0;
            let totalForum = 0;

            counter = 1;


            const fetchPromises = filteredCourses.map((item, index) => {
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

                        console.log(attendanceModules, "Presensi");

                        if (activeSemester == "TA232") {
                                
    
                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions)
                            const users = await reqUser.json()
                            let dosens = users.filter(user => user.groups.some(grup => grup.name == "DOSEN"));


                            const jumlahDosen = dosens.length;

                            dosens.forEach((dosen, dosenIndex) => {
                                dataSouceTable.push({
                                    'No': dosenIndex === 0 ? counter++ : '', // Menampilkan nomor baris yang berbeda untuk setiap dosen
                                    'Nama Kelas': dosenIndex === 0 
                                        ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>` 
                                        : '', 
                                    'rowspan': dosenIndex === 0 ? jumlahDosen : null, // Rowspan hanya untuk baris pertama
                                    'Alur Pembelajaran Terisi': dosenIndex === 0 ? banyakTerisi.length : '',
                                    'Alur Pembelajaran Total': dosenIndex === 0 ? banyakAlur.length : '',
                                    'RPS': dosenIndex === 0 ? rps.length : '',
                                    'Tugas': dosenIndex === 0 ? tugas : '',
                                    'Doc': dosenIndex === 0 ? files : '',
                                    'Survey': dosenIndex === 0 ? surveys : '',
                                    'Quiz': dosenIndex === 0 ? quizes : '',
                                    'Forum, Thread, Post': dosenIndex === 0 ? forums : '',
                                    'Dosen': `${dosen.lastname}`,  // Tampilkan nama dosen di setiap baris
                                    'Report': dosenIndex === 0 
                                        ? `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br>
                                        <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`
                                        : ''
                                });
                            });

                        }else{

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions)
                            const users = await reqUser.json()
                            let dosens = users.filter(user => user.groups.some(grup => grup.name == "DOSEN"));

                            const namaDosens = dosens.map(dosen => `${dosen.lastname}`).join(', ');


                            console.log(dosens, item.id);

                            const jumlahDosen = dosens.length;

                            dosens.forEach((dosen, dosenIndex) => {
                                dataSouceTable.push({
                                    'No': dosenIndex === 0 ? counter++ : '', // Menampilkan nomor baris yang berbeda untuk setiap dosen
                                    'Nama Kelas': dosenIndex === 0 
                                        ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>` 
                                        : '', 
                                    'rowspan': dosenIndex === 0 ? jumlahDosen : null,
                                    'Alur Pembelajaran Terisi': dosenIndex === 0 ? banyakTerisi.length : '',
                                    'Alur Pembelajaran Total': dosenIndex === 0 ? banyakAlur.length : '',
                                    'RPS': dosenIndex === 0 ? rps.length : '',
                                    'Tugas': dosenIndex === 0 ? tugas : '',
                                    'Doc': dosenIndex === 0 ? files : '',
                                    'Survey': dosenIndex === 0 ? surveys : '',
                                    'Quiz': dosenIndex === 0 ? quizes : '',
                                    'Forum': dosenIndex === 0 ? forums : '',
                                    'Dosen': `${dosen.lastname}`,
                                    'excel_namaKelas': item.fullname,
                                    'link_namaKelas': `https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}`,
                                    'link_1': dosenIndex === 0 ? `https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}` : '',
                                    'link_2': dosenIndex === 0 ? `https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}` : '',
                                    'Report': dosenIndex === 0 
                                        ? `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br>
                                        <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`
                                        : ''
                                });
                            });

                        
                           
                           
                            
                           
                        }
                                               
                    })
                    .catch((error) => console.error(error));



            });
            Promise.all(fetchPromises).then(() => {
                console.log(dataSouceTable.length, "COUNT COURSE");



        

                $("#tabelStatistik").jsGrid({
                    width: "100%",
                    height: "800px",
                    inserting: false,
                    editing: false,
                    sorting: false,
                    paging: true,
                    filtering: true,
                    autoload: true,
                    pageSize: 20,
                    pageButtonCount: 15,
                    responsive: true,
                    data: dataSouceTable,
                
                    fields: [
                        {
                            name: "No",
                            title: "No",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Nama Kelas",
                            title: "Nama Kelas",
                            type: "text",
                            minWidth: "50%",
                            filtering: true,
                        },
                        {
                            name: "Dosen",
                            title: "Dosen",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },
                        {
                            name: "Alur Pembelajaran Terisi",
                            title: "Alur Terisi",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Alur Pembelajaran Total",
                            title: "Total Alur",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "RPS",
                            title: "RPS",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Tugas",
                            title: "Tugas",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Doc",
                            title: "Doc",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Survey",
                            title: "Survey",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Quiz",
                            title: "Quiz",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Forum",
                            title: "Forum",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Report",
                            title: "Reports",
                            type: "text",
                            width: 100,
                            filtering: false,
                        },
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSouceTable, function (item) {
                                return (
                                    (!filter["Nama Kelas"] || item["Nama Kelas"].toLowerCase().indexOf(filter["Nama Kelas"].toLowerCase()) > -1) &&
                                    (!filter["Dosen"] || item["Dosen"].toLowerCase().indexOf(filter["Dosen"].toLowerCase()) > -1)
                                );
                            });
                        },
                    },
                
                    // onRefreshed: function () {
                    //     // Modifikasi tabel setelah data dimuat untuk mengatur rowspan
                    //     let kelasSebelumnya = '';
                    //     let rowSpan = 1;
                    //     let $grid = $("#tabelStatistik");
                    //     let $rows = $grid.find(".jsgrid-grid-body tbody tr");
                
                    //     $rows.each(function (index) {
                    //         let $row = $(this);
                    //         let namaKelas = $row.find('td:eq(1)').text().trim(); // Ambil Nama Kelas di kolom kedua
                
                    //         if (namaKelas === kelasSebelumnya) {
                    //             // Jika nama kelas sama dengan kelas sebelumnya, sembunyikan kolom Nama Kelas
                    //             $row.find('td:eq(1)').remove(); // Hapus cell Nama Kelas
                    //             rowSpan++;
                    //         } else {
                    //             // Jika nama kelas berbeda, atur rowspan untuk cell Nama Kelas dari kelas sebelumnya
                    //             if (rowSpan > 1) {
                    //                 $rows.eq(index - rowSpan).find('td:eq(1)').attr('rowspan', rowSpan);
                    //             }
                    //             kelasSebelumnya = namaKelas;
                    //             rowSpan = 1;
                    //         }
                    //     });
                
                    //     // Atur rowspan untuk kelas terakhir jika perlu
                    //     if (rowSpan > 1) {
                    //         $rows.eq($rows.length - rowSpan).find('td:eq(1)').attr('rowspan', rowSpan);
                    //     }
                
                    //     // Ganti <thead> di jsGrid dengan header yang diinginkan
                    //     $grid.find("thead").html(`
                    //         <thead class="table-light">
                    //             <tr align="" valign="top">
                    //                 <th rowspan="2">No</th>
                    //                 <th rowspan="2" width="50%">Nama Kelas</th>
                    //                 <th colspan="2">Alur Pembelajaran</th>
                    //                 <th rowspan="2">RPS</th>
                    //                 <th rowspan="2">Tugas</th>
                    //                 <th rowspan="2">Doc</th>
                    //                 <th rowspan="2">Survey</th>
                    //                 <th rowspan="2">Quiz</th>
                    //                 <th rowspan="2">Forum, Thread, Post</th>
                    //                 <th rowspan="2" width="30%">Dosen</th>
                    //                 <th rowspan="2" width="20%">Reports</th>
                    //             </tr>
                    //             <tr align="center">
                    //                 <th>Terisi</th>
                    //                 <th>Total</th>
                    //             </tr>
                    //         </thead>
                    //     `);
                    // },
                });

                document.getElementById("download-xlsx").addEventListener("click", function () {
                    // Ambil data dari jsGrid
                    const data = $("#tabelStatistik").jsGrid("option", "data");
                
                    const worksheetData = [
                        ["No", "Nama Kelas", "Dosen", "Alur Terisi", "Total Alur", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum", "Report Activity", "Report Completion"]
                    ];
                
                    data.forEach(item => {
                        worksheetData.push([
                            item.No,
                            { f: `HYPERLINK("${item['link_namaKelas']}", "${item['excel_namaKelas']}")`},
                            item.Dosen,
                            item["Alur Pembelajaran Terisi"],
                            item["Alur Pembelajaran Total"],
                            item.RPS,
                            item.Tugas,
                            item.Doc,
                            item.Survey,
                            item.Quiz,
                            item.Forum,
                            { f: `HYPERLINK("${item['link_1']}", "Link Activity Report")`},
                            { f: `HYPERLINK("${item['link_2']}", "Link Activity Completion")`} 
                        ]);
                    });
                
                    // Buat workbook dan worksheet
                    const wb = XLSX.utils.book_new();
                    const ws = XLSX.utils.aoa_to_sheet(worksheetData);
                
                    // Tambahkan worksheet ke workbook
                    XLSX.utils.book_append_sheet(wb, ws, "Monitoring Data");
                
                    // Unduh file Excel
                    XLSX.writeFile(wb, "Monitoring_Data.xlsx");
                });
                

            
                
            
                $("#grafik_kelas").addClass("d-none");
            
                grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);
                $("#btn_spinner").addClass("d-none");
                $("#clear_filter").removeAttr("disabled");
                $("#filter_data").removeAttr("disabled");
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

            const semester_select = $('#semester_select').select2('data');

            active = semester_select[0].element.getAttribute('mk_aktif');
            ta_semester = semester_select[0].element.getAttribute('ta_semester');

            const response = await fetch(`assets/data/list_mk_per_kelas_${ta_semester}.json`)
            const data = await response.json()
            let totalBanyakTerisi = 0;

            let totalRps = 0;
            let totalProyek = 0;
            let totalTugas = 0;
            let totalKasus = 0;
            let totalDoc = 0;
            let totalSurvey = 0;
            let totalQuiz = 0;
            let totalForum = 0;
            counter = 1

            const dataSouceTable = [];

            

            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(data => {
                        return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${data.courses[0].id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {

                                let courseid = data.courses[0].id;
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

                                // totalBanyakTerisi += banyakTerisi.length;

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


                                console.log(files);

                                let infoMK = result.filter(alur => alur.name == "Info Matakuliah");
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

                                const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${courseid}`, requestOptions)
                                const users = await reqUser.json()
                                let dosens = users.filter(user => user.groups.some(grup => grup.name == "DOSEN"));
    
    
                                const jumlahDosen = dosens.length;
    
                                dosens.forEach((dosen, dosenIndex) => {
                                    dataSouceTable.push({
                                        'No': dosenIndex === 0 ? counter++ : '', // Menampilkan nomor baris yang berbeda untuk setiap dosen
                                        'Nama Kelas': dosenIndex === 0 
                                            ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${data.courses[0].id}" target="_blank" class="">${data.courses[0].fullname} <i class="fe-external-link"></i></a>` 
                                            : '', // Tampilkan Nama Kelas hanya di baris pertama
                                        'rowspan': dosenIndex === 0 ? jumlahDosen : null, // Rowspan hanya untuk baris pertama
                                        'Alur Pembelajaran Terisi': dosenIndex === 0 ? banyakTerisi.length : '',
                                        'Alur Pembelajaran Total': dosenIndex === 0 ? banyakAlur.length : '',
                                        'RPS': dosenIndex === 0 ? rps.length : '',
                                        'Tugas': dosenIndex === 0 ? tugas : '',
                                        'Doc': dosenIndex === 0 ? files : '',
                                        'Survey': dosenIndex === 0 ? surveys : '',
                                        'Quiz': dosenIndex === 0 ? quizes : '',
                                        'Forum, Thread, Post': dosenIndex === 0 ? forums : '',
                                        'Dosen': `${dosen.lastname}`,  // Tampilkan nama dosen di setiap baris
                                        'Report': dosenIndex === 0 
                                            ? `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${data.courses[0].id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br>
                                            <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${data.courses[0].id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`
                                            : ''
                                    });
                                });

                               
                            })
                            .catch((error) => console.error(error));
                    })
                    .catch(error => {
                        console.error(error)
                    });
            });

            Promise.all(fetchPromises).then(() => {
                $("#grafik_kelas").removeClass("d-none")


                nama_prodi = `${fullname_sikola} / ${nama_prodi}`



                grafikKelas2(filteredData, requestOptions, nama_prodi);

                grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);


                $("#tabelStatistik").jsGrid({
                    width: "100%",
                    height: "800px",
                    inserting: false,
                    editing: false,
                    sorting: false,
                    paging: true,
                    filtering: true,
                    autoload: true,
                    pageSize: 20,
                    pageButtonCount: 15,
                    responsive: true,
                    data: dataSouceTable,
                
                    fields: [
                        {
                            name: "No",
                            title: "No",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Nama Kelas",
                            title: "Nama Kelas",
                            type: "text",
                            minWidth: "50%",
                            filtering: true,
                        },
                        {
                            name: "Dosen",
                            title: "Dosen",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },
                        {
                            name: "Alur Pembelajaran Terisi",
                            title: "Alur Terisi",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Alur Pembelajaran Total",
                            title: "Total Alur",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "RPS",
                            title: "RPS",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Tugas",
                            title: "Tugas",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Doc",
                            title: "Doc",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Survey",
                            title: "Survey",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Quiz",
                            title: "Quiz",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Forum",
                            title: "Forum",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "Report",
                            title: "Reports",
                            type: "text",
                            width: 100,
                            filtering: false,
                        },
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSouceTable, function (item) {
                                return (
                                    (!filter["Nama Kelas"] || item["Nama Kelas"].toLowerCase().indexOf(filter["Nama Kelas"].toLowerCase()) > -1) &&
                                    (!filter["Dosen"] || item["Dosen"].toLowerCase().indexOf(filter["Dosen"].toLowerCase()) > -1)
                                );
                            });
                        },
                    },
                
                });
                



            });


        } catch (error) {
            console.log(error);

        }
    }





}

const modalShow = (namaKelas, banyakTerisi, banyakAlur, rps, tugas, files, surveys, quizes, forums, namaDosenHtml) => {
    $("#modal_grafik").modal("show");

    // $("#apex-column-modal").html("")
    // $("#apex-pie-modal").html("")



    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-column-modal").data("colors")) && (colors = dataColors.split(","));
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
            data: [banyakTerisi, rps, tugas, files, surveys, quizes, forums]
        }, ],

        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],

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
            text: namaKelas,
            align: "center",
            style: { color: "#444" }
        },
        // legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },

        grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa" }
    };

    chart = new ApexCharts(document.querySelector("#apex-column-modal"), options);
    chart.render();

    document.querySelector("#apex-column-modal")._chartInstance = chart;



    colors = ["#077AC3", "#4fc6e1", "#4892B5", "#405D88", "#4A81D4", "#00B19D", "#798385", "#B56C79", "#F1556C"];
    (dataColors = $("#apex-pie-modal").data("colors")) && (colors = dataColors.split(","));
    options = {
        chart: {
            height: 380,
            type: "pie",
            zoom: { enabled: !0 },
            toolbar: { show: !0 }
        },
        title: {
            text: namaKelas,
            align: "center",
            style: { color: "#444" }
        },
        series: [banyakTerisi, rps, tugas, files, surveys, quizes, forums],
        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],
        colors: colors,
        legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },
        responsive: [{ breakpoint: 600, options: { chart: { height: 240 }, legend: { show: !1 } } }]
    };
    (chart = new ApexCharts(document.querySelector("#apex-pie-modal"), options)).render();

    document.querySelector("#apex-pie-modal")._chartInstance = chart;


}


async function getUserDosen(absenDosen, requestOptions) {
    try {
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

    // if (chart) {
    //     chart.destroy(); // Destroy the previous chart instance
    // }

    // console.log("BNNN");
    colors = ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#ffe200", "#798385"];
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
            data: [totalBanyakTerisi, totalRps, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum]
        }, ],

        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],

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

    document.querySelector("#apex-column-2")._chartInstance = chart;



    colors = ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#ffe200", "#798385"];
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
        series: [totalBanyakTerisi, totalRps, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum],
        labels: ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"],
        colors: colors,
        legend: { show: !0, position: "bottom", horizontalAlign: "center", verticalAlign: "middle", floating: !1, fontSize: "14px", offsetX: 0, offsetY: 7 },
        responsive: [{ breakpoint: 600, options: { chart: { height: 240 }, legend: { show: !1 } } }]
    };
    (chart = new ApexCharts(document.querySelector("#apex-pie-1"), options)).render();

    document.querySelector("#apex-pie-1")._chartInstance = chart;

    // const chartPie = new ApexCharts(document.querySelector("#apex-pie-1"));
    // chartPie.option(options)
    // chartPie.render()




    // chart.destroy(); // Destroy the previous chart instance

    // chart.destroy()
}

const grafikKelas = async(kelasMK, requestOptions) => {

    const chartElement3 = document.querySelector('#apex-column-1');
    if (chartElement3 && chartElement3._chartInstance) {
        console.log(chartElement3._chartInstance);
        chartElement3._chartInstance.destroy();
    }
    let categories = [];
    let dataTerisi = [];
    let dataRPS = [];
    let dataTugas = [];
    let dataDoc = [];
    let dataSurvey = [];
    let dataQuiz = [];
    let dataForum = [];

    for (const item of kelasMK) {
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions);
        const data = await response.json();
        const courseId = data.courses[0].id;
        const contentResponse = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${courseId}`, requestOptions);
        const contentData = await contentResponse.json();

        // Kumpulkan data
        let totalTerisi = contentData.filter(section => section.name !== "Info Matakuliah" && section.modules.length > 0).length;
        let totalRPS = contentData.filter(section => section.name === "Info Matakuliah" && section.modules.some(modul => modul.modname === "resource")).length;
        let totalTugas = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "assign").length, 0);
        let totalDoc = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length, 0);
        let totalSurvey = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "survey").length, 0);
        let totalQuiz = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "quiz").length, 0);
        let totalForum = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "forum").length, 0);

        // Tambahkan ke array
        categories.push(data.courses[0].fullname);
        dataTerisi.push(totalTerisi);
        dataRPS.push(totalRPS);
        dataTugas.push(totalTugas);
        dataDoc.push(totalDoc);
        dataSurvey.push(totalSurvey);
        dataQuiz.push(totalQuiz);
        dataForum.push(totalForum);
    }

    // Konfigurasi grafik

    colors = ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#ffe200", "#798385"];
    (dataColors = $("#apex-column-1").data("colors")) && (colors = dataColors.split(","));
    const options = {
        chart: {
            height: 380,
            type: "bar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "rounded",
                columnWidth: "55%"
            }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        series: [
            { name: "Alur Pembelajaran (Terisi)", data: dataTerisi },
            { name: "RPS", data: dataRPS },
            { name: "Tugas", data: dataTugas },
            { name: "Doc", data: dataDoc },
            { name: "Survey", data: dataSurvey },
            { name: "Quiz", data: dataQuiz },
            { name: "Forum", data: dataForum },
        ],
        color: colors,
        xaxis: {
            categories: categories,

        },

        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center', // 'left', 'right', or 'center'
            floating: false,
            fontSize: '14px',
            offsetY: 10
        },
        fill: { opacity: 1 },
        grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa", padding: { bottom: 20 } }
    };

    const chart = new ApexCharts(document.querySelector("#apex-column-1"), options);
    chart.render();
    document.querySelector("#apex-column-1")._chartInstance = chart;


    $("#btn_spinner").addClass("d-none")
    $("#clear_filter").removeAttr("disabled")

    $("#filter_data").removeAttr("disabled")



}
const grafikKelas2 = async(kelasMK, requestOptions, nama_kelas) => {

    $("#juduL_kelas").html(`Grafik Kelas - ${nama_kelas}`)

    const chartElement3 = document.querySelector('#apex-column-1');
    if (chartElement3 && chartElement3._chartInstance) {
        console.log(chartElement3._chartInstance);
        chartElement3._chartInstance.destroy();
    }
    let categories = ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"];
    let seriesData = [];

    for (const item of kelasMK) {
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions);
        const data = await response.json();
        const courseId = data.courses[0].id;
        const contentResponse = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${courseId}`, requestOptions);
        const contentData = await contentResponse.json();

        // Kumpulkan data
        let totalTerisi = contentData.filter(section => section.name !== "Info Matakuliah" && section.modules.length > 0).length;
        let totalRPS = contentData.filter(section => section.name === "Info Matakuliah" && section.modules.some(modul => modul.modname === "resource")).length;
        let totalTugas = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "assign").length, 0);
        let totalDoc = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length, 0);
        let totalSurvey = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "survey").length, 0);
        let totalQuiz = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "quiz").length, 0);
        let totalForum = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "forum").length, 0);

        // Tambahkan data ke array series
        seriesData.push({
            name: data.courses[0].fullname,
            data: [totalTerisi, totalRPS, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum]
        });
    }

    // Konfigurasi grafik
    colors = ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#ffe200", "#798385"];
    (dataColors = $("#apex-column-1").data("colors")) && (colors = dataColors.split(","));
    const options = {
        chart: {
            height: 380,
            type: "bar",
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "rounded",
                columnWidth: "55%"
            }
        },
        dataLabels: { enabled: false },
        stroke: { show: true, width: 2, colors: ["transparent"] },
        series: seriesData,
        colors: colors,
        xaxis: {
            categories: categories,
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            offsetY: 10
        },
        fill: { opacity: 1 },
        grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa", padding: { bottom: 20 } }
    };

    const chart = new ApexCharts(document.querySelector("#apex-column-1"), options);
    chart.render();
    document.querySelector("#apex-column-1")._chartInstance = chart;

    $("#btn_spinner").addClass("d-none")
    $("#clear_filter").removeAttr("disabled")

    $("#filter_data").removeAttr("disabled")


}

// $(document).ready(function() {

// Add an event listener for semester_select change


// });
// if (semester_aktif_storage && nama_prodi_storage) {
//     $('#semester_select').val(semester_aktif_storage).trigger('change');
//     $('#program_studi').val(nama_prodi_storage).trigger('change');
//     filter_data();
// }
// if (semester_aktif_storage && nama_prodi_storage && mk_value_storage) {
//     $('#semester_select').val(semester_aktif_storage).trigger('change');
//     $('#program_studi').val(nama_prodi_storage).trigger('change');
//     $('#select_mk').val(mk_value_storage);
//     filter_data();
// }
// Trigger the semester_select change event
// $('#semester_select').val(semester_aktif_storage).trigger('change');

// // Add an event listener for semester_select change
// $("#semester_select").on("change", function(e) {
//     if (!e.originalEvent) {
//         semester_select_fun();
//         prodi_select_fun();

//     }
// });

// Add an event listener for program_studi change
// $("#program_studi").on("change", function(e) {
//     if (!e.originalEvent) {
//         prodi_select_fun();
//     }
// });



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

    const chartElement3 = document.querySelector('#apex-column-1');
    if (chartElement3 && chartElement3._chartInstance) {
        console.log(chartElement3._chartInstance);
        chartElement3._chartInstance.destroy();
    }
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