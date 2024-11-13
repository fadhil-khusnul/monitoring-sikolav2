// let fieldsJs = []




$("#semester_select, #program_studi_presensi, #select_mk").select2()








let nama_prodi_storage = localStorage.getItem('nama_prodi_storage');
const id_prodi_storage = localStorage.getItem('id_prodi_storage');
const semester_aktif_storage = localStorage.getItem('semester_aktif_storage');
let mk_value_storage = localStorage.getItem('mk_value_storage');
let isFilterCleared = false;
if (semester_aktif_storage) {
    $('#semester_select').val(semester_aktif_storage).trigger('change');
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

    sessionStorage.removeItem('nama_prodi_storage');
    sessionStorage.removeItem('id_prodi_storage');
    sessionStorage.removeItem('semester_aktif_storage');
    sessionStorage.removeItem('selectedKodeMatkul_storage');
    sessionStorage.removeItem('fullname_sikola_storage');
    sessionStorage.removeItem('mk_value_storage');
    sessionStorage.removeItem('mk_aktif');


    $('#select_mk').val("").trigger('change');
    $('#program_studi').val("").trigger('change');


    const semester_select_data = $('#semester_select').select2('data');
    active = semester_select_data[0].element.getAttribute('mk_aktif');
    ta_semester = semester_select_data[0].element.getAttribute('ta_semester');
    const select_mk = document.getElementById("select_mk");
    select_mk.innerHTML = "";
    const default_Mk = document.createElement("option")
    default_Mk.text = `${ta_semester}`


    const response = await fetch('assets/data/get_all_prodi.json');
    const data = await response.json();

    const select = document.getElementById("program_studi");
    const semester_select = document.getElementById("semester_select");
    const selectedOption = semester_select.options[semester_select.selectedIndex];
    console.log(selectedOption);

    console.log(id_fakultas);
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

            if (!item.nama_resmi.toLowerCase().includes("hapus")) {
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
    // console.log(selectedOption);
    const nama_prodi = selectedOption.value;
    console.log(nama_prodi);
    const id_prodi = selectedOption.getAttribute('id_prodi');

    localStorage.setItem('nama_prodi_storage', nama_prodi);

    let active = sessionStorage.getItem('mk_aktif');
    let ta_semester = sessionStorage.getItem('ta_semester');

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


    if (isFilterCleared) {
        return;
    }

    // if (mk_value_storage) {
    //     $('#select_mk').val(mk_value_storage).trigger('change');
    // }

    // if (nama_prodi_storage != nama_prodi) {
    //     $('#select_mk').val("").trigger('change');

    // }

    // if (nama_prodi_storage != nama_prodi && !mk_value_storage) {

    //     localStorage.removeItem('mk_value_storage');

    //     filter_data() // Remove from localStorage


    // }

    // if (nama_prodi_storage && !mk_value_storage) {
    //     // $('#program_studi').val(nama_prodi_storage).trigger('change');

    //     // console.log("1111");
    //     filter_data();
    //     nama_prodi_storage = null;
    //     // localStorage.removeItem('nama_prodi_storage'); // Remove from localStorage
    //     // Reset mk_value_storage

    // } else if (nama_prodi_storage && mk_value_storage) {
    //     // console.log("222");
    //     $('#select_mk').val(mk_value_storage).trigger('change');
    //     filter_data();
    //     // nama_prodi_storage = null; // Reset mk_value_storage
    //     mk_value_storage = null; // Reset mk_value_storage
    //     localStorage.removeItem('mk_value_storage'); // Remove from localStorage

    // }



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
    $("#filter_data, #clear_filter").attr("disabled", true);
    $("#btn_spinner").removeClass("d-none")
    $("#judul_prodi, #apex-column-2, #apex-pie-1", "#ajaran").html("")
        // tableStatistik.clear().draw();
        // tabelInforMk.clear().draw();

    clearJsGrid("#table_presensi_matkul_mhs");



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

        const semester_select = document.getElementById("semester_select");
        const selectedOption = semester_select.options[semester_select.selectedIndex];

        const activeSemester = selectedOption.getAttribute('ta_semester');

        
        const ajaran = selectedOption.innerHTML;

        try {
            $("#judul_prodi").html(nama_prodi)
            $("#ajaran").html(ajaran)

           

            const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
            const result = await response.json();
            const response1 = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
            const dataCourses = await response1.json()

            let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));

           
            counter = 1
            

            const dataSource = [];
            let jumlahWeeks = 0;        

            const fetchPromises = filteredCourses.map(item => {
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                    .then((response) => response.json())
                    .then(async result => {
                        if (activeSemester == "TA232") {
                            const startDate = '2024-02-19';

                            jumlahWeeks = 18;

                            const weeks = generateWeeks(startDate, jumlahWeeks);

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions);
                            const users = await reqUser.json();
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));

                            const weekCountersMhs = {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });


                            let logMhs = await fetch(`/services/sikolaLogMhs.php?courseId=${item.id}`, requestOptions)
                            logMhs = await logMhs.json();

                            console.log('LOGS', logMhs);
                            


                            mahasiswas.forEach((mhs, index) => {
                                const logs = logMhs.filter(log => log.userid == mhs.id)
                                groupByWeekMhs(logs, mhs.id, weekCountersMhs, weeks);
                                const terisiMhsCount = logs.length;

                                let pekanCounts_mhs = {};
                                Object.keys(weeks).forEach((week, i) => {
                                    pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                });
                        
                                dataSource.push({
                                    'no_mhs': index === 0 ? counter++ : '',
                                    'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    'mhs': `${mhs.fullname}`,
                                    'total_mhs': terisiMhsCount,
                                    'link': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${item.id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                    ...pekanCounts_mhs
                                });
                            });                            
                        }else{

                            const startDate = '2024-08-19';

                            jumlahWeeks = 16;

                            const weeks = generateWeeks(startDate, jumlahWeeks);

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions);
                            const users = await reqUser.json();
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));

                            const weekCountersMhs = {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });


                            let logMhs = await fetch(`/services/sikolaLogMhs.php?courseId=${item.id}`, requestOptions)
                            logMhs = await logMhs.json();

                            console.log('LOGS', logMhs);
                            


                            mahasiswas.forEach((mhs, index) => {
                                const logs = logMhs.filter(log => log.userid == mhs.id)
                                groupByWeekMhs(logs, mhs.id, weekCountersMhs, weeks);
                                const terisiMhsCount = logs.length;

                                let pekanCounts_mhs = {};
                                Object.keys(weeks).forEach((week, i) => {
                                    pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                });
                        
                                dataSource.push({
                                    'no_mhs': index === 0 ? counter++ : '',
                                    'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                    'mhs': `${mhs.fullname}`,
                                    'total_mhs': terisiMhsCount,
                                    'link': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${item.id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                    ...pekanCounts_mhs
                                });
                            }); 

                        }
                    })
                    .catch(error => {
                        console.error(error)

                       


                    });



            });

            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")
                $("#filter_data").removeAttr("disabled")

                const pekanFields = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan_mhs${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));
    

                $("#tabel_log").jsGrid({
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
                    data: dataSource,
                
                    fields: [
                        {
                            name: "no_mhs",
                            title: "No",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "kelas_mhs",
                            title: "Nama Kelas",
                            type: "text",
                            minWidth: "50%",
                            filtering: true,
                            itemTemplate: function(value, item) {
                                if (item.no_mhs !== '') {
                                    return value;
                                }
                                return ""; 
                            }
                        },
                        {
                            name: "mhs",
                            title: "Nama Mahasiswa",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Total Akitifitas",
                            name: "total_mhs",
                            type: "number",
                            minWidth: '30%',
                            filtering: false,
                        },
                        {
                            title: "Link Report",
                            name: "link",
                            type: "text",
                            minWidth: '30%',
                            filtering: false,
                        },
                        
                        ...pekanFields,                       
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSource, function (item) {
                                return (
                                    (!filter["kelas_mhs"] || item["kelas_mhs"].toLowerCase().indexOf(filter["kelas_mhs"].toLowerCase()) > -1) &&
                                    (!filter["mhs"] || item["mhs"].toLowerCase().indexOf(filter["mhs"].toLowerCase()) > -1)
                                );
                            });
                        },
                    },
                
                   
                });

               


            });



        } catch (error) {

            console.log(error);

        }
    } else {
        try {
            localStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            localStorage.setItem('fullname_sikola_storage', fullname_sikola)
            localStorage.setItem('mk_value_storage', mk_value)

            const semester_select = $('#semester_select').select2('data');

            active = semester_select[0].element.getAttribute('mk_aktif');
            activeSemester = semester_select[0].element.getAttribute('ta_semester');
            ajaran = semester_select[0].text


            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
            $("#ajaran").html(ajaran)


            const response = await fetch(`assets/data/list_mk_per_kelas_${ta_semester}.json`)
            const data = await response.json()

            counter = 1

            let jumlahWeeks = 0;        

            const dataSource = [];

            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(async kelas => {


                        if (activeSemester == "TA232") {
                            const startDate = '2024-02-19';

                            jumlahWeeks = 18;

                            const weeks = generateWeeks(startDate, jumlahWeeks);

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${kelas.courses[0].id}`, requestOptions);
                            const users = await reqUser.json();
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));

                            const weekCountersMhs = {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });


                            let logMhs = await fetch(`/services/sikolaLogMhs.php?courseId=${kelas.courses[0].id}`, requestOptions)
                            logMhs = await logMhs.json();

                            console.log('LOGS', logMhs);
                            


                            mahasiswas.forEach((mhs, index) => {
                                const logs = logMhs.filter(log => log.userid == mhs.id)
                                groupByWeekMhs(logs, mhs.id, weekCountersMhs, weeks);
                                const terisiMhsCount = logs.length;

                                let pekanCounts_mhs = {};
                                Object.keys(weeks).forEach((week, i) => {
                                    pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                });
                        
                                dataSource.push({
                                    'no_mhs': index === 0 ? counter++ : '',
                                    'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                    'mhs': `${mhs.fullname}`,
                                    'total_mhs': terisiMhsCount,
                                    'link': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${kelas.courses[0].id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                    ...pekanCounts_mhs
                                });
                            });                            
                        }else{

                            const startDate = '2024-08-19';

                            jumlahWeeks = 16;

                            const weeks = generateWeeks(startDate, jumlahWeeks);

                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${kelas.courses[0].id}`, requestOptions);
                            const users = await reqUser.json();
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));

                            const weekCountersMhs = {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });


                            let logMhs = await fetch(`/services/sikolaLogMhs.php?courseId=${kelas.courses[0].id}`, requestOptions)
                            logMhs = await logMhs.json();

                            console.log('LOGS', logMhs);
                            


                            mahasiswas.forEach((mhs, index) => {
                                const logs = logMhs.filter(log => log.userid == mhs.id)
                                groupByWeekMhs(logs, mhs.id, weekCountersMhs, weeks);
                                const terisiMhsCount = logs.length;

                                let pekanCounts_mhs = {};
                                Object.keys(weeks).forEach((week, i) => {
                                    pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                });
                        
                                dataSource.push({
                                    'no_mhs': index === 0 ? counter++ : '',
                                    'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                    'mhs': `${mhs.fullname}`,
                                    'total_mhs': terisiMhsCount,
                                    'link': index === 0 ? `<a href="https://sikola-v2.unhas.ac.id/report/log/index.php?id=${kelas.courses[0].id}" target="_blank">Report Actitivity <i class="fe-external-link"></i></a>` : '',
                                    ...pekanCounts_mhs
                                });
                            }); 

                        }

                    })
                    .catch(error => {

                        console.error(error)
                    });




            });

            Promise.all(fetchPromises).then(() => {
                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")

                $("#filter_data").removeAttr("disabled")

                const pekanFields = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan_mhs${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));
    

                $("#tabel_log").jsGrid({
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
                    data: dataSource,
                
                    fields: [
                        {
                            name: "no_mhs",
                            title: "No",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            name: "kelas_mhs",
                            title: "Nama Kelas",
                            type: "text",
                            minWidth: "50%",
                            filtering: true,
                            itemTemplate: function(value, item) {
                                if (item.no_mhs !== '') {
                                    return value;
                                }
                                return ""; 
                            }
                        },
                        {
                            name: "mhs",
                            title: "Nama Mahasiswa",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Total Akitifitas",
                            name: "total_mhs",
                            type: "number",
                            minWidth: '30%',
                            filtering: false,
                        },
                        {
                            title: "Link Report",
                            name: "link",
                            type: "text",
                            minWidth: '30%',
                            filtering: false,
                        },
                        
                        ...pekanFields,                       
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSource, function (item) {
                                return (
                                    (!filter["kelas_mhs"] || item["kelas_mhs"].toLowerCase().indexOf(filter["kelas_mhs"].toLowerCase()) > -1) &&
                                    (!filter["mhs"] || item["mhs"].toLowerCase().indexOf(filter["mhs"].toLowerCase()) > -1)
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


function clearJsGrid(gridId) {
    $(gridId).jsGrid("option", "data", []).jsGrid("refresh");
}
const clear_filter = async() => {
    // isFilterCleared = true; // Setel flag menjadi true


    localStorage.removeItem('nama_prodi_storage');
    localStorage.removeItem('id_prodi_storage');
    localStorage.removeItem('semester_aktif_storage');
    localStorage.removeItem('selectedKodeMatkul_storage');
    localStorage.removeItem('fullname_sikola_storage');
    localStorage.removeItem('mk_value_storage');
    localStorage.removeItem('mk_aktif');


    $("#judul_prodi, #judul_prodi_mhs, #judul_prodi_e").html("")
    $("#filter_data").attr("disabled", true)

    // tableStatistik.clear().draw();

    clearJsGrid("#table_presensi_matkul_mhs");

    // tabelInforMk.clear().draw();
    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



}

async function getUserMahasiswa(absenMhs, requestOptions) {
    try {
        const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions);
        const result = await response.json();
        const namaMhs = result[0].users;
        return namaMhs;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const formatDate = (date) => {
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};
const generateWeeks = (startDate, numWeeks) => {
    const weeks = {};
    let currentDate = new Date(startDate);

    for (let i = 1; i <= numWeeks; i++) {
        let weekStart = new Date(currentDate);
        let weekEnd = new Date(currentDate);
        weekEnd.setDate(weekEnd.getDate() + 6); // Tambah 6 hari untuk mendapatkan akhir minggu

        weeks[`pekan${i}`] = { start: formatDate(weekStart), end: formatDate(weekEnd) };

        currentDate.setDate(currentDate.getDate() + 7);
    }

    return weeks;
};

const groupByWeekMhs = (logs, mhsId, weekCountersMhs, weeks) => {
    logs.forEach(item => {
        const sessdate = formatDate(new Date(item.timecreated * 1000));

        for (const [week, range] of Object.entries(weeks)) {
            if (sessdate >= range.start && sessdate <= range.end) {
                weekCountersMhs[mhsId][week]++;
                break;
            }
        }


    });
};