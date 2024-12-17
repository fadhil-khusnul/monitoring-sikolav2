
var scrollPosition = 0;



let id_fakultas = document.getElementById("id_fakultas").value;


let isFilterCleared = false;



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


$('#semester_select').select2({
    placeholder: 'Pilih Semester',
    allowClear: true,
    width: '100%',
});

$('#program_studi').select2({
    placeholder: 'Pilih Program Studi',
    allowClear: true,
    width: '100%',
});

let nama_prodi_storage = sessionStorage.getItem('nama_prodi_storage');
let semester_aktif_storage = sessionStorage.getItem('semester_aktif_storage');

console.log(semester_aktif_storage, nama_prodi_storage);

if (semester_aktif_storage && nama_prodi_storage) {
    $('#semester_select').val(semester_aktif_storage).trigger('change');
    $('#program_studi').val(nama_prodi_storage).trigger('change');


}

$('#program_studi').on('change', async function () {
    await prodi_select_fun();
});
async function semester_select_fun() {
    if (isFilterCleared) {
        return;
    }


    const semester_select = $('#semester_select').select2('data');

    console.log('semester_select', semester_select);
    
    active = semester_select[0].element.getAttribute('mk_aktif');
    ta_semester = semester_select[0].element.getAttribute('ta_semester');
    const select_mk = document.getElementById("select_mk");
    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `${ta_semester} - `
    default_Mk.setAttribute("value", "")
    default_Mk.setAttribute("disabled", "true")
    default_Mk.setAttribute("selected", "true")
    select_mk.appendChild(default_Mk)
    select_mk.dispatchEvent(new Event('change'));

    console.log('namaPRODIIs', nama_prodi_storage, id_fakultas, ta_semester);



    sessionStorage.setItem('semester_aktif_storage', semester_select[0].id)






    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    // const select = document.getElementById("program_studi");

    const select = document.getElementById("program_studi");


    if (id_fakultas > 0) {
        const listProdi = data.filter(prodi => prodi.fakultas.id === parseInt(id_fakultas) && !prodi.nama_resmi.toLowerCase().includes("hapus"))
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
    
    const program_studi = $('#program_studi').select2('data');
    
    console.log('prodiFun', program_studi);
    const selectedOption = program_studi.options[program_studi.selectedIndex];

    const nama_prodi = selectedOption.value;


    const id_prodi = selectedOption.getAttribute('id_prodi');

    sessionStorage.setItem('nama_prodi_storage', id_prodi);



    // let active = sessionStorage.getItem('mk_aktif');
    // let ta_semester = sessionStorage.getItem('ta_semester');

    const semester_select = $('#semester_select').select2('data');
    active = semester_select[0].element.getAttribute('mk_aktif');
    ta_semester = semester_select[0].element.getAttribute('ta_semester');
    // if (!active) {
    // }







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


    sessionStorage.setItem('ta_semester', ta_semester);
    sessionStorage.setItem('mk_aktif', active);
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

    // if (nama_prodi_storage && !mk_value_storage) {
    //     filter_data();
    //     nama_prodi_storage = null;


    // } else if (nama_prodi_storage && mk_value_storage) {
    //     $('#select_mk').val(mk_value_storage).trigger('change');
    //     filter_data();
    //     mk_value_storage = null; 

    //     sessionStorage.removeItem('mk_value_storage'); 
    // }

}



async function filter_data() {

    if (isFilterCleared) {
        return;
    }

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1, #apex-column-1").html("")

    const program_studi = document.getElementById("program_studi")

    

    const selectedOption = program_studi.options[program_studi.selectedIndex];
    let nama_prodi = selectedOption.value;
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');
    console.log("NAMA PRODI", id_prodi, nama_prodi);

    sessionStorage.setItem('nama_prodi_storage', nama_prodi)
    sessionStorage.setItem('id_prodi_storage', id_prodi)
    // sessionStorage.setItem('semester_aktif_storage', semester_aktif)



    const select_mk = $('#select_mk').select2('data');
    const mk_value = select_mk[0].id;
    const selectedKodeMatkul = select_mk[0].element?.getAttribute('data_kode_matkul');
    const fullname_sikola = select_mk[0].element?.getAttribute('fullname_sikola');


    if (!selectedKodeMatkul && !fullname_sikola) {

        const semester_select = document.getElementById("semester_select");
        const selectedOption = semester_select.options[semester_select.selectedIndex];

        const activeSemester = selectedOption.getAttribute('ta_semester');

        const ajaran = selectedOption.innerHTML;





        try {
            $("#judul_prodi").html(`${nama_prodi}`)
            $("#ajaran").html(`${ajaran}`)

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



                        let banyakAlur = result.filter(alur => alur.section !== 0);
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



                        let infoMK = result.filter(alur => alur.section == 0);
                        let rps = infoMK.filter(section => section.modules.some(modul => modul.modname == "resource"));

                        totalRps += rps.length

                        let attendanceModules = [];


                        result.forEach(section => {
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


                            const namaDosens = dosens.map(dosen => dosen.lastname).join('<br>');


                            // Gabungkan nama dosen dengan <br> sebagai pemisah antar nama

                            console.log(dosens, item.id);

                            dataSouceTable.push({
                                'No': counter++, // Increment untuk setiap course
                                'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                'rowspan': 1, // Karena sekarang semua dosen dalam satu baris
                                'Alur Pembelajaran Terisi': banyakTerisi.length,
                                'Alur Pembelajaran Total': banyakAlur.length,
                                'RPS': rps.length,
                                'Tugas': tugas,
                                'Doc': files,
                                'Survey': surveys,
                                'Quiz': quizes,
                                'Forum': forums,
                                'Dosen': namaDosens, // Nama dosen dipisahkan dengan <br>
                                'excel_namaKelas': item.fullname,
                                'link_namaKelas': `https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}`,
                                'link_1': `https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}`,
                                'link_2': `https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}`,
                                'Report': `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br> <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`,
                            });





                            // dosens.forEach((dosen, dosenIndex) => {
                            // dataSouceTable.push({
                            //     'No': dosenIndex === 0 ? counter++ : '', // Menampilkan nomor baris yang berbeda untuk setiap dosen
                            //     'Nama Kelas': dosenIndex === 0
                            //         ? `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`
                            //         : '',
                            //     'rowspan': dosenIndex === 0 ? jumlahDosen : 0, // Rowspan hanya untuk baris pertama
                            //     'Alur Pembelajaran Terisi': dosenIndex === 0 ? banyakTerisi.length : '',
                            //     'Alur Pembelajaran Total': dosenIndex === 0 ? banyakAlur.length : '',
                            //     'RPS': dosenIndex === 0 ? rps.length : '',
                            //     'Tugas': dosenIndex === 0 ? tugas : '',
                            //     'Doc': dosenIndex === 0 ? files : '',
                            //     'Survey': dosenIndex === 0 ? surveys : '',
                            //     'Quiz': dosenIndex === 0 ? quizes : '',
                            //     'Forum': dosenIndex === 0 ? forums : '',
                            //     'Dosen': `${dosen.lastname}`,  // Tampilkan nama dosen di setiap baris
                            //     'Report': dosenIndex === 0
                            //         ? `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br>
                            //             <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`
                            //         : ''
                            // });
                            // });

                        } else {

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions)
                            const users = await reqUser.json()
                            let dosens = users.filter(user => user.groups.some(grup => grup.name == "DOSEN"));

                            const namaDosens = dosens.map(dosen => dosen.lastname).join('<br>');

                            dataSouceTable.push({
                                'No': counter++, // Increment untuk setiap course
                                'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                'rowspan': 1, // Karena sekarang semua dosen dalam satu baris
                                'Alur Pembelajaran Terisi': banyakTerisi.length,
                                'Alur Pembelajaran Total': banyakAlur.length,
                                'RPS': rps.length,
                                'Tugas': tugas,
                                'Doc': files,
                                'Survey': surveys,
                                'Quiz': quizes,
                                'Forum': forums,
                                'Dosen': namaDosens, // Nama dosen dipisahkan dengan <br>
                                'excel_namaKelas': item.fullname,
                                'link_namaKelas': `https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}`,
                                'link_1': `https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}`,
                                'link_2': `https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}`,
                                'Report': `<a href="https://sikola-v2.unhas.ac.id/report/outline/index.php?id=${item.id}" target="_blank" class="">Activity Report <i class="fe-external-link"></i></a> <br> <a href="https://sikola-v2.unhas.ac.id/report/progress/index.php?course=${item.id}" target="_blank" class="">Activity Completion <i class="fe-external-link"></i></a>`,
                            });










                        }

                    })
                    .catch((error) => console.error(error));



            });



            Promise.all(fetchPromises).then(() => {
                console.log(dataSouceTable, "COUNT COURSE");



                const jsonData = {
                    total: dataSouceTable.length,
                    totalNotFiltered: dataSouceTable.length,
                    rows: dataSouceTable
                };

                fetch('services/writeStatistik.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => response.json())
                    .then(data => {


                        if (data.status === 'success') {
                            // Refresh BootstrapTable
                            $('#tableStatistikB').bootstrapTable('refresh', {
                                url: 'services/data/statistik.json',
                                pagination: true,
                                search: true,
                                sidePagination: 'server',
                                silent: true,

                                columns: [{
                                    field: 'Dosen',
                                    title: 'Dosen',
                                    escape: false
                                }],



                            })

                            let originalData = [];

                            const allDosens = [...new Set(dataSouceTable.flatMap(row =>
                                row.Dosen.split('<br>').map(name => name.trim())
                            ))];

                            // Tambahkan ke dalam Select2
                            allDosens.forEach(dosen => {
                                $('#filterDosen').append(new Option(dosen, dosen));
                            });

                            // Inisialisasi Select2
                            $('#filterDosen').select2({
                                placeholder: "Pilih Dosen",
                                width: '500px',
                                dropdownAutoWidth: false,
                            });

                            // Ambil data asli dan simpan di `originalData` setelah tabel di-load
                            $('#tableStatistikB').on('post-body.bs.table', function () {
                                if (originalData.length === 0) {
                                    originalData = $('#tableStatistikB').bootstrapTable('getData');
                                }
                            });

                            // Event handler untuk filter
                            $('#filterDosen').on('change', function () {
                                const selectedDosen = $(this).val();
                                console.log('selectedDosen', selectedDosen);

                                if (selectedDosen) {
                                    // Filter data berdasarkan kecocokan sebagian (partial match)
                                    const filteredData = originalData.filter(row =>
                                        row.Dosen && row.Dosen.toLowerCase().includes(selectedDosen.toLowerCase())
                                    );

                                    // Refresh tabel dengan data yang difilter
                                    $('#tableStatistikB').bootstrapTable('load', filteredData);
                                } else {
                                    // Jika filter dikosongkan, tampilkan semua data asli
                                    $('#tableStatistikB').bootstrapTable('load', originalData);
                                }
                            });

                            $('#clearFilter').on('click', function () {
                                // Hapus pilihan di Select2
                                $('#filterDosen').val(null).trigger('change');
                            
                                // Tampilkan semua data asli
                                $('#tableStatistikB').bootstrapTable('load', originalData);
                            });











                        } else {
                            console.error('Error from PHP:', data.message);
                        }

                        console.log('Response from PHP:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });





                // downloadJSON(jsonData, 'data/statistik.json');








                // const tableBody = $('#tableBody');
                // dataSouceTable.forEach((row, index) => {
                //     let rowHtml = `<tr>`;
                //     for (const key in row) {
                //         if (key === 'rowspan' || key === 'Dosen') continue; // Skip rowspan key
                //         if (row.rowspan && key !== 'Dosen') {
                //             rowHtml += `<td rowspan="${row.rowspan}">${row[key]}</td>`;
                //         } else if (!row.rowspan && key !== 'Dosen') {
                //             rowHtml += `<td>${row[key]}</td>`;
                //         }
                //     }
                //     rowHtml += `</tr>`;
                //     tableBody.append(rowHtml);
                // });







                // $("#tabelStatistik").jsGrid({
                //     width: "100%",
                //     height: "800px",

                //     paging: true,
                //     filtering: true,
                //     autoload: true,
                //     pageSize: 20,
                //     pageButtonCount: 15,
                //     responsive: true,
                //     data: dataSouceTable,

                //     fields: [
                //         {
                //             name: "No",
                //             title: "No",
                //             type: "number",
                //             width: 50,
                //             filtering: false,



                //         },
                //         {
                //             name: "Nama Kelas",
                //             title: "Nama Kelas",
                //             type: "text",
                //             minWidth: "50%",
                //             filtering: true,

                //             itemTemplate: function(value, item) {
                //                 if (item.No !== '') {
                //                     return value;
                //                 }


                //             }
                //         },
                //         {
                //             name: "Dosen",
                //             title: "Dosen",
                //             type: "text",
                //             width: 100,
                //             filtering: true,
                //         },
                //         {
                //             name: "Alur Pembelajaran Terisi",
                //             title: "Alur Terisi",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Alur Pembelajaran Total",
                //             title: "Total Alur",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "RPS",
                //             title: "RPS",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Tugas",
                //             title: "Tugas",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Doc",
                //             title: "Doc",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Survey",
                //             title: "Survey",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Quiz",
                //             title: "Quiz",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Forum",
                //             title: "Forum",
                //             type: "number",
                //             width: 50,
                //             filtering: false,

                //         },
                //         {
                //             name: "Report",
                //             title: "Reports",
                //             type: "text",
                //             width: 100,
                //             filtering: false,

                //         },
                //     ],

                //     controller: {
                //         loadData: function (filter) {
                //             return $.grep(dataSouceTable, function (item) {
                //                 return (
                //                     (!filter["Nama Kelas"] || item["Nama Kelas"].toLowerCase().indexOf(filter["Nama Kelas"].toLowerCase()) > -1) &&
                //                     (!filter["Dosen"] || item["Dosen"].toLowerCase().indexOf(filter["Dosen"].toLowerCase()) > -1)
                //                 );
                //             });
                //         },
                //     },

                //     onRefreshed: function () {
                //         const rows = $("#tabelStatistik tbody tr");

                //         rows.each(function (rowIndex) {
                //             const $row = $(this);
                //             const data = $row.data("JSGridItem"); // Ambil data item jsGrid untuk baris ini

                //             if (data && data.rowspan) {
                //                 $row.find("td").each(function (colIndex) {
                //                     const $td = $(this);

                //                     // Abaikan kolom 'Dosen'
                //                     const fieldName = $("#tabelStatistik").jsGrid("option", "fields")[colIndex].name;
                //                     if (fieldName !== "Dosen") {
                //                         if (!$td.attr("rowspan")) {
                //                             // Tambahkan rowspan hanya untuk kolom non-Dosen
                //                             $td.attr("rowspan", data.rowspan);

                //                             // Hapus elemen <td> di baris berikutnya
                //                             for (let i = 1; i < data.rowspan; i++) {
                //                                 const $nextRow = rows.eq(rowIndex + i);
                //                                 $nextRow.find(`td:eq(${colIndex})`).remove();
                //                             }
                //                         }
                //                     }
                //                 });
                //             }
                //         });

                //         // Pastikan baris kosong tidak ada
                //         rows.each(function () {
                //             const $row = $(this);

                //             // Jika baris hanya memiliki kolom kosong, hapus
                //             if (!$row.children("td").length) {
                //                 $row.remove();
                //             }
                //         });
                //     }



                //     // onRefreshed: function () {
                //     //     $("#tabelStatistik tbody tr").each(function () {
                //     //         const $row = $(this);
                //     //         const data = $row.data("JSGridItem"); // Dapatkan data item jsGrid

                //     //         if (data && data.rowspan) {
                //     //             $row.find("td").each(function (index) {
                //     //                 const $td = $(this);

                //     //                 // Abaikan kolom 'Dosen'
                //     //                 const fieldName = $("#tabelStatistik").jsGrid("option", "fields")[index].name;
                //     //                 if (fieldName !== "Dosen") {
                //     //                     $td.attr("rowspan", data.rowspan);
                //     //                 }
                //     //             });
                //     //         }
                //     //     });
                //     // }


                // });

                // $('#tabelStatistikBoots').bootstrapTable({
                //     data: dataSouceTable
                // });

                // $("#tabelStatistik").jsGrid('setGroupHeaders', {
                //     useColSpanStyle: false, 
                //     groupHeaders:[
                //       {startColumnName: 'Alur Pembelajaran Terisi', numberOfColumns: 3, titleText: '<em>ALur Group</em>'},
                //     //   {startColumnName: 'closed', numberOfColumns: 2, titleText: 'Shiping'}
                //     ]
                // });

                document.getElementById("download-xlsx").addEventListener("click", function () {
                    // Ambil data dari jsGrid
                    // const data = $("#tabelStatistik").jsGrid("option", "data");
                    const data = $('#tabelStatistik').bootstrapTable('getData');


                    const worksheetData = [
                        ["No", "Nama Kelas", "Dosen", "Alur Terisi", "Total Alur", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum", "Report Activity", "Report Completion"]
                    ];

                    data.forEach(item => {
                        worksheetData.push([
                            item.No,
                            { f: `HYPERLINK("${item['link_namaKelas']}", "${item['excel_namaKelas']}")` },
                            item.Dosen,
                            item["Alur Pembelajaran Terisi"],
                            item["Alur Pembelajaran Total"],
                            item.RPS,
                            item.Tugas,
                            item.Doc,
                            item.Survey,
                            item.Quiz,
                            item.Forum,
                            { f: `HYPERLINK("${item['link_1']}", "Link Activity Report")` },
                            { f: `HYPERLINK("${item['link_2']}", "Link Activity Completion")` }
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





                $("#grafik_kelas, #tab_perKelas").addClass("d-none");

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
            sessionStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            sessionStorage.setItem('fullname_sikola_storage', fullname_sikola)
            sessionStorage.setItem('mk_value_storage', mk_value)
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
                $("#grafik_kelas, #tab_perKelas").removeClass("d-none")


                nama_prodi = `${fullname_sikola} / ${nama_prodi}`



                grafikKelas2(filteredData, requestOptions, nama_prodi);
                tab_perKelas(filteredData, requestOptions, nama_prodi);

                grafik_statistik(totalBanyakTerisi, totalRps, totalProyek, totalTugas, totalKasus, totalDoc, totalSurvey, totalQuiz, totalForum, nama_prodi);


                const jsonData = {
                    total: dataSouceTable.length,
                    totalNotFiltered: dataSouceTable.length,
                    rows: dataSouceTable
                };

                fetch('services/writeStatistik.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(jsonData)
                })
                    .then(response => response.json())
                    .then(data => {


                        if (data.status === 'success') {
                            // Refresh BootstrapTable
                            $('#tableStatistikB').bootstrapTable('refresh', {
                                url: 'services/data/statistik.json',
                                pagination: true,
                                search: true,
                                sidePagination: 'server',
                                silent: true,

                                columns: [{
                                    field: 'Dosen',
                                    title: 'Dosen',
                                    escape: false
                                }],



                            })

                            let originalData = [];

                            const allDosens = [...new Set(dataSouceTable.flatMap(row =>
                                row.Dosen.split('<br>').map(name => name.trim())
                            ))];

                            // Tambahkan ke dalam Select2
                            allDosens.forEach(dosen => {
                                $('#filterDosen').append(new Option(dosen, dosen));
                            });

                            // Inisialisasi Select2
                            $('#filterDosen').select2({
                                placeholder: "Pilih Dosen",
                                width: '500px',
                                dropdownAutoWidth: false,
                            });

                            // Ambil data asli dan simpan di `originalData` setelah tabel di-load
                            $('#tableStatistikB').on('post-body.bs.table', function () {
                                if (originalData.length === 0) {
                                    originalData = $('#tableStatistikB').bootstrapTable('getData');
                                }
                            });

                            // Event handler untuk filter
                            $('#filterDosen').on('change', function () {
                                const selectedDosen = $(this).val();
                                console.log('selectedDosen', selectedDosen);

                                if (selectedDosen) {
                                    // Filter data berdasarkan kecocokan sebagian (partial match)
                                    const filteredData = originalData.filter(row =>
                                        row.Dosen && row.Dosen.toLowerCase().includes(selectedDosen.toLowerCase())
                                    );

                                    // Refresh tabel dengan data yang difilter
                                    $('#tableStatistikB').bootstrapTable('load', filteredData);
                                } else {
                                    // Jika filter dikosongkan, tampilkan semua data asli
                                    $('#tableStatistikB').bootstrapTable('load', originalData);
                                }
                            });

                            $('#clearFilter').on('click', function () {
                                // Hapus pilihan di Select2
                                $('#filterDosen').val(null).trigger('change');
                            
                                // Tampilkan semua data asli
                                $('#tableStatistikB').bootstrapTable('load', originalData);
                            });

                        } else {
                            console.error('Error from PHP:', data.message);
                        }

                        console.log('Response from PHP:', data);
                    })
                    .catch(error => {
                        console.error('Error:', error);
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
        },],

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
        },],

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

const grafikKelas = async (kelasMK, requestOptions) => {

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
const grafikKelas2 = async (kelasMK, requestOptions, nama_kelas) => {

    $("#juduL_kelas").html(`Grafik Perbandingan Kelas - ${nama_kelas}`)

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


const tab_perKelas = async (kelasMK, requestOptions, nama_prodi) => {
    // Set judul
    $("#judul_tab_kelas").html(`Grafik PerKelas - ${nama_prodi}`);

    // Hapus elemen tabs dan konten sebelumnya
    $("#nav-tabs-kelas").empty();
    $("#tab-content-kelas").empty();

    // Variabel untuk konfigurasi grafik
    let categories = ["Alur Pembelajaran (Terisi)", "RPS", "Tugas", "Doc", "Survey", "Quiz", "Forum"];

    let colors = ["#008ffb", "#00e396", "#feb019", "#ff4560", "#775dd0", "#ffe200", "#798385"];


    for (const [index, item] of kelasMK.entries()) {
        // Buat nav-tabs secara dinamis


        const tabId = `tabKelas-${index}`;
        const navItem = `
            <li class="nav-item">
                <a href="#${tabId}" data-bs-toggle="tab" aria-expanded="false" class="nav-link ${index === 0 ? 'active' : ''}">
                    ${item.fullname_kelas_sikola}
                </a>
            </li>`;
        $("#nav-tabs-kelas").append(navItem);

        // Buat konten tab secara dinamis
        const tabContent = `
            <div class="tab-pane ${index === 0 ? 'active' : ''}" id="${tabId}">
                <div id="grafik-${tabId}" class="apex-charts pt-3" data-colors="${colors.join(',')}"></div>
            </div>`;
        $("#tab-content-kelas").append(tabContent);

        // Fetch data untuk kelas
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions);
        const data = await response.json();
        const courseId = data.courses[0].id;
        const contentResponse = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${courseId}`, requestOptions);
        const contentData = await contentResponse.json();

        // Hitung data untuk grafik
        let totalTerisi = contentData.filter(section => section.name !== "Info Matakuliah" && section.modules.length > 0).length;
        let totalRPS = contentData.filter(section => section.name === "Info Matakuliah" && section.modules.some(modul => modul.modname === "resource")).length;
        let totalTugas = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "assign").length, 0);
        let totalDoc = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "resource" || modul.modname === "folder").length, 0);
        let totalSurvey = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "survey").length, 0);
        let totalQuiz = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "quiz").length, 0);
        let totalForum = contentData.reduce((acc, section) => acc + section.modules.filter(modul => modul.modname === "forum").length, 0);


        // Konfigurasi grafik
        const options = {
            chart: {
                height: 380,
                type: "bar",
                toolbar: { show: false }
            },
            plotOptions: {
                bar: {
                    dataLabels: { position: "top" },
                    distributed: true,

                }
            },

            dataLabels: {
                enabled: !0,
                offsetY: -40,
                style: { fontSize: "12px", colors: ["#304758"] }
            },
            stroke: { show: true, width: 2, colors: ["transparent"] },
            series: [{
                name: item.nama_kelas,
                data: [totalTerisi, totalRPS, totalTugas, totalDoc, totalSurvey, totalQuiz, totalForum]
            }],
            colors: colors,
            xaxis: { categories: categories },

            title: {
                text: item.fullname_kelas_sikola,
                align: "center",
                style: { color: "#444" }
            },
            fill: { opacity: 1 },
            grid: { row: { colors: ["transparent", "transparent"], opacity: .2 }, borderColor: "#f1f3fa", padding: { bottom: 20 } }
        };

        // Render grafik untuk tab tersebut
        const chart = new ApexCharts(document.querySelector(`#grafik-${tabId}`), options);
        chart.render();
    }

    // Sembunyikan spinner dan aktifkan tombol
    $("#btn_spinner").addClass("d-none");
    $("#clear_filter").removeAttr("disabled");
    $("#filter_data").removeAttr("disabled");
};




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



const clear_filter = async () => {
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
    sessionStorage.removeItem('nama_prodi_storage');
    sessionStorage.removeItem('id_prodi_storage');
    sessionStorage.removeItem('semester_aktif_storage');
    sessionStorage.removeItem('selectedKodeMatkul_storage');
    sessionStorage.removeItem('fullname_sikola_storage');
    sessionStorage.removeItem('mk_value_storage');
    sessionStorage.removeItem('mk_aktif');


    $("#judul_prodi, #tab_perKelas").html("")
    $("#filter_data").attr("disabled", true)

    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}
