

$("#semester_select, #program_studi_presensi, #select_mk").select2()





let nama_prodi_storage = sessionStorage.getItem('nama_prodi_storage');
const id_prodi_storage = sessionStorage.getItem('id_prodi_storage');
const semester_aktif_storage = sessionStorage.getItem('semester_aktif_storage');
let mk_value_storage = sessionStorage.getItem('mk_value_storage');
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
    // console.log(selectedOption);
    const nama_prodi = selectedOption.value;
    console.log(nama_prodi);
    const id_prodi = selectedOption.getAttribute('id_prodi');

    sessionStorage.setItem('nama_prodi_storage', nama_prodi);

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



    // if (nama_prodi_storage && !mk_value_storage) {

    //     filter_data();
    //     nama_prodi_storage = null;
    // } else if (nama_prodi_storage && mk_value_storage) {
    //     // console.log("222");
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
    $("#judul_prodi, #apex-column-2, #apex-pie-1, #ajaran, #ajaran_mhs").html("")
  



    let nama_prodi = document.getElementById("program_studi").value
    let semester_aktif = document.getElementById("semester_select").value
    let id_prodi = document.getElementById("program_studi");
    id_prodi = id_prodi.options[id_prodi.selectedIndex];
    id_prodi = id_prodi.getAttribute('id_prodi');

    sessionStorage.setItem('nama_prodi_storage', nama_prodi)
    sessionStorage.setItem('id_prodi_storage', id_prodi)
    sessionStorage.setItem('semester_aktif_storage', semester_aktif)


    const select_mk = $('#select_mk').select2('data');    
    const mk_value = select_mk[0].id;
    const selectedKodeMatkul = select_mk[0].element?.getAttribute('data_kode_matkul');
    const fullname_sikola = select_mk[0].element?.getAttribute('fullname_sikola');


    console.log(select_mk, fullname_sikola, 'selectdemk');



    

    if (!selectedKodeMatkul && !fullname_sikola) {

        const semester_select = document.getElementById("semester_select");
        const selectedOption = semester_select.options[semester_select.selectedIndex];

        const activeSemester = selectedOption.getAttribute('ta_semester');

        console.log('activeSemester',selectedOption.innerHTML);
        
        const ajaran = selectedOption.innerHTML;

        try {
            $("#judul_prodi").html(nama_prodi)
            $("#ajaran").html(ajaran)
            $("#ajaran_mhs").html(ajaran)
            $("#judul_prodi_mhs").html(nama_prodi)
            $("#judul_prodi_e").html(nama_prodi)

            const response = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_categories&criteria[0][key]=name&criteria[0][value]=${nama_prodi}`, requestOptions)
            const result = await response.json();
            const response1 = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=category&value=${result[0].id}`, requestOptions)
            const dataCourses = await response1.json()


            let jumlahWeeks = 0;


            counter = 1
            counter_e = 1
            counter_m = 1
        
            const dataSouceTable = [];
            const dataSouceTableMhs = [];


            
            console.log('activeSemester', activeSemester);

            let filteredCourses = dataCourses.courses.filter(course => course.shortname.includes(activeSemester));


           


            
            
            
            const fetchPromises = filteredCourses.map(item => {
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${item.id}`, requestOptions)
                .then((response) => response.json())
                .then(async result => {
                        const attendanceModules = [];

                        
                        
                        result.forEach(section => {
                            section.modules.forEach(module => {
                                if (module.modname === "attendance") {
                                    attendanceModules.push(module);
                                }
                            });
                        });
                        
                       
                        if (activeSemester == "TA232") {
                            let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");
                            let absenMhs = attendanceModules.filter(alur => alur.name === "Presensi Mahasiswa");
                            attendanceMhsE = attendanceModules.filter(alur => alur.name !== "Presensi Pengampu Mata Kuliah" && alur.name !== "Presensi Mahasiswa");
                        
                            const startDate = '2024-02-19';
                            jumlahWeeks = 18;
                            const weeks = generateWeeks(startDate, jumlahWeeks);
                        
                            // Fetching dosen information
                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions);
                            const users = await reqUser.json();
                            let dosens = users.filter(user => user.groups?.some(grup => grup.name == "DOSEN"));
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));

                        
                            const weekCountersDosen = {};
                            dosens.forEach(dosen => {
                                weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });
                           

                            //M A H A S I S W A

                            const weekCountersMhs= {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });
                          

                            if (absenDosen.length > 0 && absenDosen[0]?.instance || absenMhs.length > 0 && absenMhs[0]?.instance ) {
                                
                                const presensiDosen = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions);
                                const absenDosenData = await presensiDosen.json() || null;


                                const presensiMhs = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions);
                                const absenMhsData = await presensiMhs.json() || null;
                            
                                let absenId = absenDosenData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                                let absenIdMhs = absenMhsData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                            
                                const groupsFetch = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${item.id}`, requestOptions);
                                const groups = await groupsFetch.json();
                            
                                let dosenGroupId = groups.find(group => group.name === "DOSEN").id || null;
                                let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id || null;

                                // let terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.groupid == dosenGroupId);
                                let terisiDosen = absenDosenData.filter(sessi => (
                                    sessi.attendance_log && sessi.groupid == dosenGroupId
                                ));

                                let terisiMhs = absenMhsData.filter(sessi => (
                                    sessi.attendance_log.length > 0  && sessi.groupid == mahasiswaGroupId
                                ));
            
                               
                               
                            
                                groupByWeekDosen(terisiDosen, absenId, weekCountersDosen, weeks);
                                groupByWeekMhs(terisiMhs, absenIdMhs, weekCountersMhs, weeks);

                            
                                let totalDosen = absenDosenData.filter(sessi => sessi.groupid == dosenGroupId);

                                let totalMhs = absenMhsData.filter(sessi => sessi.groupid == mahasiswaGroupId);

                            
                                dosens.forEach((dosen, index) => {
                                    let terisiCount = Object.values(weekCountersDosen[dosen.id]).reduce((a, b) => a + b, 0);
                            
                                    let pekanCounts = {};
                                    Object.keys(weeks).forEach((week, i) => {
                                        pekanCounts[`pekan${i + 1}`] = weekCountersDosen[dosen.id][week] || 0;
                                    });
                            
                                    dataSouceTable.push({
                                        'No': index === 0 ? counter++ : '',
                                        'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                        'Dosen': `${dosen.fullname}`,
                                        'terisi': terisiCount,
                                        'total': index === 0 ? totalDosen.length : '',
                                        ...pekanCounts
                                    });
                                });

                                mahasiswas.forEach((mhs, index) => {
                                    let terisiCountMhs = Object.values(weekCountersMhs[mhs.id]).reduce((a, b) => a + b, 0);                          
                                    let pekanCounts_mhs = {};
                                    Object.keys(weeks).forEach((week, i) => {
                                        pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                    });
                            
                                    dataSouceTableMhs.push({
                                        'no_mhs': index === 0 ? counter_m++ : '',
                                        'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                        'mhs': `${mhs.fullname}`,
                                        'terisi_mhs': terisiCountMhs,
                                        'total_mhs': index === 0 ? totalMhs.length : '',
                                        ...pekanCounts_mhs
                                    });
                                });
                            }
                        
                        
                        }else{
                        
                            const startDate = '2024-08-19';
                            jumlahWeeks = 16;
                            const weeks = generateWeeks(startDate, jumlahWeeks);
                        
                            // Fetching dosen information
                            const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${item.id}`, requestOptions);
                            const users = await reqUser.json();




                            
                            let dosens = users.filter(user => user.groups?.some(grup => grup.name == "DOSEN"));
                            let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));
                        
                            const weekCountersDosen = {};
                            dosens.forEach(dosen => {
                                weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });
                            const namaDosenById = {};
                            dosens.forEach(dosen => {
                                namaDosenById[dosen.id] = dosen;
                            });


                            //M A H A S I S W A

                            const weekCountersMhs= {};
                            mahasiswas.forEach(mhs => {
                                weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                            });
                           

                            if (attendanceModules.length > 0 && attendanceModules[0]?.instance) {
                                
                                const presensiDosen = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${attendanceModules[0].instance}`, requestOptions);
                                const absenDosenData = await presensiDosen.json()

                                

                            
                                let absenId = absenDosenData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                            
                                const groupsFetch = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${item.id}`, requestOptions);
                                const groups = await groupsFetch.json();



                            
                                let dosenGroupId = groups.find(group => group.name === "DOSEN").id || null;
                                let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id || null;

                                let totalDosen = absenDosenData.filter(sessi => sessi.groupid == dosenGroupId);
                                
                                let totalMhs = absenDosenData.filter(sessi => sessi.groupid == mahasiswaGroupId);

                                let terisiDosen = absenDosenData.filter(sessi => (
                                    sessi.attendance_log && sessi.groupid == dosenGroupId
                                ));
                                
                                let terisiMhs = absenDosenData.filter(sessi => (
                                    sessi.attendance_log.length > 0  && sessi.groupid == mahasiswaGroupId
                                ));
                                // console.log('sessdate ', terisiDosen, item.id, dosenGroupId, absenDosen, attendanceModules);
                                // Group by week for dosen
                                
                            
                                groupByWeekDosen(terisiDosen, absenId, weekCountersDosen, weeks);
                                
                                groupByWeekMhs(terisiMhs, absenId, weekCountersMhs, weeks);
                            
                                dosens.forEach((dosen, index) => {
                                    let terisiCount = Object.values(weekCountersDosen[dosen.id]).reduce((a, b) => a + b, 0);
                            
                                    let pekanCounts = {};
                                    Object.keys(weeks).forEach((week, i) => {
                                        pekanCounts[`pekan${i + 1}`] = weekCountersDosen[dosen.id][week] || 0;
                                    });
                            
                                    dataSouceTable.push({
                                        'No': index === 0 ? counter++ : '',
                                        'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                        'Dosen': `${dosen.fullname}`,
                                        'terisi': terisiCount,
                                        'total': index === 0 ? totalDosen.length : '',
                                        ...pekanCounts
                                    });
                                });


                                
                                
                                mahasiswas.forEach((mhs, index) => {
                                    let terisiCountMhs = Object.values(weekCountersMhs[mhs.id]).reduce((a, b) => a + b, 0);                            
                                    let pekanCounts_mhs = {};
                                    Object.keys(weeks).forEach((week, i) => {
                                        pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                    });
                            
                                    dataSouceTableMhs.push({
                                        'no_mhs': index === 0 ? counter_m++ : '',
                                        'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${item.id}" target="_blank" class="">${item.fullname} <i class="fe-external-link"></i></a>`,
                                        'mhs': `${mhs.fullname}`,
                                        'terisi_mhs': terisiCountMhs,
                                        'total_mhs': index === 0 ? totalMhs.length : '',
                                        ...pekanCounts_mhs
                                    });
                                });
                            }

                        }

                        
                    });
                    
            });


            
                
            Promise.all(fetchPromises).then(() => {

                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")
                $("#filter_data").removeAttr("disabled")

                const pekanFields = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));

                const pekanFieldsMhs = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan_mhs${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));

                console.log('dataSouceTableMhs', dataSouceTable);

              

                console.log(dataSouceTable.length, "DOSENS");
                $("#tabelDosen").jsGrid({
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
                            itemTemplate: function(value, item) {
                                // Menampilkan Nama Kelas hanya pada baris pertama
                                if (item.No !== '') {
                                    return value;
                                }
                                return ""; // Baris lainnya tidak menampilkan Nama Kelas
                            }
                        },
                        {
                            name: "Dosen",
                            title: "Dosen",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Presensi Terisi",
                            name: "terisi",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            title: "Total Presensi",
                            name: "total",
                            type: "nimber",
                            width: 50,
                            filtering: false,
                        },

                        ...pekanFields, 

                       
                      
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
                $("#table_presensi_matkul_mhs").jsGrid({
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
                    data: dataSouceTableMhs,
                
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
                                // Menampilkan Nama Kelas hanya pada baris pertama
                                if (item.No !== '') {
                                    return value;
                                }
                                return ""; // Baris lainnya tidak menampilkan Nama Kelas
                            }
                        },
                        {
                            name: "mhs",
                            title: "Mahasiswa",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Presensi Terisi",
                            name: "terisi_mhs",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            title: "Total Presensi",
                            name: "total_mhs",
                            type: "nimber",
                            width: 50,
                            filtering: false,
                        },

                        ...pekanFieldsMhs, 

                       
                      
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSouceTableMhs, function (item) {
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
            sessionStorage.setItem('selectedKodeMatkul_storage', selectedKodeMatkul)
            sessionStorage.setItem('fullname_sikola_storage', fullname_sikola)
            sessionStorage.setItem('mk_value_storage', mk_value)
          

            const semester_select = $('#semester_select').select2('data');

            active = semester_select[0].element.getAttribute('mk_aktif');
            ta_semester = semester_select[0].element.getAttribute('ta_semester');
            ajaran = semester_select[0].text

            $("#judul_prodi").html(fullname_sikola + " / " + nama_prodi)
            $("#judul_prodi_mhs").html(fullname_sikola + " / " + nama_prodi)
            $("#judul_prodi_e").html(fullname_sikola + " / " + nama_prodi)
            $("#ajaran").html(ajaran)
            $("#ajaran_mhs").html(ajaran)

            console.log('semester_select', semester_select);
            
            const response = await fetch(`assets/data/list_mk_per_kelas_${ta_semester}.json`)
            const data = await response.json()

            counter = 1
            counter_e = 1
            counter_m = 1

            let jumlahWeeks = 0;        
            const dataSouceTable = [];
            const dataSouceTableMhs = [];


            const filteredData = data.filter(item => item.kode_matkul === selectedKodeMatkul);

            const fetchPromises = filteredData.map(item => {
                // console.log(item.shortname_sikola);
                return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_courses_by_field&field=shortname&value=${item.shortname_sikola}`, requestOptions)
                    .then((response) => response.json())
                    .then(async kelas => {
                        return fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_course_get_contents&courseid=${kelas.courses[0].id}`, requestOptions)
                            .then((response) => response.json())
                            .then(async result => {

                                
                                // let infoMK = result.filter(alur => alur.section == 0);
                                let attendanceModules = [];

                                jumlahWeeks = 18;


                                

                                result.forEach(section => {
                                    section.modules.forEach(modul => {
                                        if (modul.modname === "attendance") {
                                            attendanceModules.push(modul);
                                        }

                                    });
                                });

                                
                                if (ta_semester == "TA232") {
                                    let absenDosen = attendanceModules.filter(alur => alur.name === "Presensi Pengampu Mata Kuliah");
                                    let absenMhs = attendanceModules.filter(alur => alur.name === "Presensi Mahasiswa");

                                    const startDate = '2024-02-19';
                                    jumlahWeeks = 18;
                                    const weeks = generateWeeks(startDate, jumlahWeeks);

                                    

                                    const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${kelas.courses[0].id}`, requestOptions);
                                    const users = await reqUser.json();
                                    let dosens = users.filter(user => user.groups?.some(grup => grup.name == "DOSEN"));
                                    let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));
        
                                
                                    const weekCountersDosen = {};
                                    dosens.forEach(dosen => {
                                        weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                    });
                                   
        
                                    //M A H A S I S W A
                                    const weekCountersMhs= {};
                                    mahasiswas.forEach(mhs => {
                                        weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                    });

                                    if (absenDosen.length > 0 && absenDosen[0]?.instance || absenMhs.length > 0 && absenMhs[0]?.instance) {
                                        const presensiDosen = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenDosen[0].instance}`, requestOptions);
                                        const absenDosenData = await presensiDosen.json() || null;
        
        
                                        const presensiMhs = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${absenMhs[0].instance}`, requestOptions);
                                        const absenMhsData = await presensiMhs.json() || null;
                                    
                                        let absenId = absenDosenData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                                        let absenIdMhs = absenMhsData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                                    
                                        const groupsFetch = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${kelas.courses[0].id}`, requestOptions);
                                        const groups = await groupsFetch.json();
                                    
                                        let dosenGroupId = groups.find(group => group.name === "DOSEN").id || null;
                                        let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id || null;
        
                                        // let terisiDosen = absenDosenData.filter(sessi => sessi.attendance_log && sessi.groupid == dosenGroupId);
                                        let terisiDosen = absenDosenData.filter(sessi => (
                                            sessi.attendance_log && sessi.groupid == dosenGroupId
                                        ));
        
                                        let terisiMhs = absenMhsData.filter(sessi => (
                                            sessi.attendance_log.length > 0  && sessi.groupid == mahasiswaGroupId
                                        ));
                    
                                    
                                        groupByWeekDosen(terisiDosen, absenId, weekCountersDosen, weeks);
                                        groupByWeekMhs(terisiMhs, absenIdMhs, weekCountersMhs, weeks);
        
                                    
                                        let totalDosen = absenDosenData.filter(sessi => sessi.groupid == dosenGroupId);
                                        let totalMhs = absenMhsData.filter(sessi => sessi.groupid == mahasiswaGroupId);
        
                                    
                                        dosens.forEach((dosen, index) => {
                                            let terisiCount = Object.values(weekCountersDosen[dosen.id]).reduce((a, b) => a + b, 0);
                                    
                                            let pekanCounts = {};
                                            Object.keys(weeks).forEach((week, i) => {
                                                pekanCounts[`pekan${i + 1}`] = weekCountersDosen[dosen.id][week] || 0;
                                            });
                                    
                                            dataSouceTable.push({
                                                'No': index === 0 ? counter++ : '',
                                                'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                'Dosen': `${dosen.fullname}`,
                                                'terisi': terisiCount,
                                                'total': index === 0 ? totalDosen.length : '',
                                                ...pekanCounts
                                            });
                                        });

                                        console.log('dataSouceTable.push', jumlahWeeks);
                                        
        
                                        mahasiswas.forEach((mhs, index) => {
                                            let terisiCountMhs = Object.values(weekCountersMhs[mhs.id]).reduce((a, b) => a + b, 0);                          
                                            let pekanCounts_mhs = {};
                                            Object.keys(weeks).forEach((week, i) => {
                                                pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                            });
                                    
                                            dataSouceTableMhs.push({
                                                'no_mhs': index === 0 ? counter_m++ : '',
                                                'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                'mhs': `${mhs.fullname}`,
                                                'terisi_mhs': terisiCountMhs,
                                                'total_mhs': index === 0 ? totalMhs.length : '',
                                                ...pekanCounts_mhs
                                            });
                                        });

                                        
                                    }
                                  
                                    
                                } else {

                                    const startDate = '2024-08-19';
                                    jumlahWeeks = 16;
                                    const weeks = generateWeeks(startDate, jumlahWeeks);
                                
                                    // Fetching dosen information
                                    const reqUser = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_enrol_get_enrolled_users&courseid=${kelas.courses[0].id}`, requestOptions);
                                    const users = await reqUser.json();
        
        
        
        
                                    
                                    let dosens = users.filter(user => user.groups?.some(grup => grup.name == "DOSEN"));
                                    let mahasiswas = users.filter(user => user.groups?.some(grup => grup.name == "MAHASISWA"));
                                
                                    const weekCountersDosen = {};
                                    dosens.forEach(dosen => {
                                        weekCountersDosen[dosen.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                    });
                                    const namaDosenById = {};
                                    dosens.forEach(dosen => {
                                        namaDosenById[dosen.id] = dosen;
                                    });
        
        
                                    //M A H A S I S W A
        
                                    const weekCountersMhs= {};
                                    mahasiswas.forEach(mhs => {
                                        weekCountersMhs[mhs.id] = Object.fromEntries(Object.keys(weeks).map(week => [week, 0]));
                                    });
                                   
        
                                    if (attendanceModules.length > 0 && attendanceModules[0]?.instance) {
                                        
                                        const presensiDosen = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=mod_attendance_get_sessions&attendanceid=${attendanceModules[0].instance}`, requestOptions);
                                        const absenDosenData = await presensiDosen.json()
        
                                        
        
                                    
                                        let absenId = absenDosenData.find(data => data.statuses?.some(status => status.acronym === "A"))?.statuses?.find(status => status.acronym === "A")?.id || null;
                                    
                                        const groupsFetch = await fetch(`https://sikola-v2.unhas.ac.id/webservice/rest/server.php?wstoken=07480e5bbb440a596b1ad8e33be525f8&moodlewsrestformat=json&wsfunction=core_group_get_course_groups&courseid=${kelas.courses[0].id}`, requestOptions);
                                        const groups = await groupsFetch.json();
        
        
        
                                    
                                        let dosenGroupId = groups.find(group => group.name === "DOSEN").id || null;
                                        let mahasiswaGroupId = groups.find(group => group.name === "MAHASISWA").id || null;
        
                                        let totalDosen = absenDosenData.filter(sessi => sessi.groupid == dosenGroupId);
                                        
                                        let totalMhs = absenDosenData.filter(sessi => sessi.groupid == mahasiswaGroupId);
        
                                        let terisiDosen = absenDosenData.filter(sessi => (
                                            sessi.attendance_log && sessi.groupid == dosenGroupId
                                        ));
                                        
                                        let terisiMhs = absenDosenData.filter(sessi => (
                                            sessi.attendance_log.length > 0  && sessi.groupid == mahasiswaGroupId
                                        ));
                                        // console.log('sessdate ', terisiDosen, item.id, dosenGroupId, absenDosen, attendanceModules);
                                        // Group by week for dosen
                                        
                                    
                                        groupByWeekDosen(terisiDosen, absenId, weekCountersDosen, weeks);
                                        
                                        groupByWeekMhs(terisiMhs, absenId, weekCountersMhs, weeks);
                                    
                                        dosens.forEach((dosen, index) => {
                                            let terisiCount = Object.values(weekCountersDosen[dosen.id]).reduce((a, b) => a + b, 0);
                                    
                                            let pekanCounts = {};
                                            Object.keys(weeks).forEach((week, i) => {
                                                pekanCounts[`pekan${i + 1}`] = weekCountersDosen[dosen.id][week] || 0;
                                            });
                                    
                                            dataSouceTable.push({
                                                'No': index === 0 ? counter++ : '',
                                                'Nama Kelas': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                'Dosen': `${dosen.fullname}`,
                                                'terisi': terisiCount,
                                                'total': index === 0 ? totalDosen.length : '',
                                                ...pekanCounts
                                            });
                                        });
        
        
                                        
                                        
                                        mahasiswas.forEach((mhs, index) => {
                                            let terisiCountMhs = Object.values(weekCountersMhs[mhs.id]).reduce((a, b) => a + b, 0);                            
                                            let pekanCounts_mhs = {};
                                            Object.keys(weeks).forEach((week, i) => {
                                                pekanCounts_mhs[`pekan_mhs${i + 1}`] = weekCountersMhs[mhs.id][week] || 0;
                                            });
                                    
                                            dataSouceTableMhs.push({
                                                'no_mhs': index === 0 ? counter_m++ : '',
                                                'kelas_mhs': `<a href="https://sikola-v2.unhas.ac.id/course/view.php?id=${kelas.courses[0].id}" target="_blank" class="">${kelas.courses[0].fullname} <i class="fe-external-link"></i></a>`,
                                                'mhs': `${mhs.fullname}`,
                                                'terisi_mhs': terisiCountMhs,
                                                'total_mhs': index === 0 ? totalMhs.length : '',
                                                ...pekanCounts_mhs
                                            });
                                        });
                                    }

                                    
                                    
                                }

                               







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


                $("#btn_spinner").addClass("d-none")
                $("#clear_filter").removeAttr("disabled")
                $("#filter_data").removeAttr("disabled")

                const pekanFields = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));

                const pekanFieldsMhs = Array.from({ length: jumlahWeeks }, (_, i) => ({
                    title: (i + 1).toString(),
                    name: `pekan_mhs${i + 1}`,
                    type: "number",
                    width: 50,
                    filtering: false,
                }));

                

                $("#tabelDosen").jsGrid({
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
                            itemTemplate: function(value, item) {
                                // Menampilkan Nama Kelas hanya pada baris pertama
                                if (item.No !== '') {
                                    return value;
                                }
                                return ""; // Baris lainnya tidak menampilkan Nama Kelas
                            }
                        },
                        {
                            name: "Dosen",
                            title: "Dosen",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Presensi Terisi",
                            name: "terisi",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            title: "Total Presensi",
                            name: "total",
                            type: "nimber",
                            width: 50,
                            filtering: false,
                        },

                        ...pekanFields, 

                       
                      
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
                $("#table_presensi_matkul_mhs").jsGrid({
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
                    data: dataSouceTableMhs,
                
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
                                // Menampilkan Nama Kelas hanya pada baris pertama
                                if (item.No !== '') {
                                    return value;
                                }
                                return ""; // Baris lainnya tidak menampilkan Nama Kelas
                            }
                        },
                        {
                            name: "mhs",
                            title: "Mahasiswa",
                            type: "text",
                            width: 100,
                            filtering: true,
                        },

                        {
                            title: "Presensi Terisi",
                            name: "terisi_mhs",
                            type: "number",
                            width: 50,
                            filtering: false,
                        },
                        {
                            title: "Total Presensi",
                            name: "total_mhs",
                            type: "nimber",
                            width: 50,
                            filtering: false,
                        },

                        ...pekanFieldsMhs, 

                       
                      
                    ],
                
                    controller: {
                        loadData: function (filter) {
                            return $.grep(dataSouceTableMhs, function (item) {
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
    sessionStorage.removeItem('nama_prodi_storage');
    sessionStorage.removeItem('id_prodi_storage');
    sessionStorage.removeItem('semester_aktif_storage');
    sessionStorage.removeItem('selectedKodeMatkul_storage');
    sessionStorage.removeItem('fullname_sikola_storage');
    sessionStorage.removeItem('mk_value_storage');
    sessionStorage.removeItem('mk_aktif');


    $("#judul_prodi, #judul_prodi_mhs, #judul_prodi_e, #ajaran, #ajaran_mhs").html("")
    $("#filter_data").attr("disabled", true)

    tableStatistik.clear().draw();
    tabelMhs.clear().draw();
    tabelInforMk.clear().draw();
    $("#semester_select, #program_studi, #select_mk").val("").trigger("change");



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


const groupByWeekDosen = (dataAbsen, absenId, weekCountersDosen, weeks) => {
    dataAbsen.forEach(item => {
        const sessdate = formatDate(new Date(item.sessdate * 1000));

        
        item.attendance_log.forEach(log => {
            const dosenId = log.studentid;
            const statusId = log.statusid;
            if (weekCountersDosen[dosenId] && statusId !== absenId) {
                for (const [week, range] of Object.entries(weeks)) {
                    if (sessdate >= range.start && sessdate <= range.end) {
                        weekCountersDosen[dosenId][week]++;
                        break;
                    }
                }
            }
        });
    });
};

const groupByWeekMhs = (dataMhs, absenIdMhs, weekCountersMhs, weeks) => {
    dataMhs.forEach(item => {
        const sessdate = formatDate(new Date(item.sessdate * 1000));
        
        item.attendance_log.forEach(log => {
            const mhsId = log.studentid;
            const statusId = log.statusid;
            if (weekCountersMhs[mhsId] && statusId !== absenIdMhs) {
                for (const [week, range] of Object.entries(weeks)) {
                    if (sessdate >= range.start && sessdate <= range.end) {
                        weekCountersMhs[mhsId][week]++;
                        break;
                    }
                }
            }
        });
    });
};
