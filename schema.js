var schema_assesi = {
	fields: [{
          type: "input",
          inputType: "text",
          label: "Nama Lengkap",
          model: "nama",
          readonly: false, //hampir sama kayak disabled
          featured: true, //Ngebold no label
          required: true, //ini seng merah2 buat penting apa ga nya
          disabled: false,
          placeholder: "User's name", //tulisan abu2 lek gaada tulisan
          validator: VueFormGenerator.validators.string //kayak e buat bandingin deh
      }, {
        type: "input",
        inputType: "date",
        label: "Tanggal Lahir",
        model: "tanggal"
      }, {
        type: "input",
        inputType: "text",
        label: "Tempat Lahir",
        model: "tempat",
        readonly: false, //hampir sama kayak disabled
        featured: true, //Ngebold no label
        required: true, //ini seng merah2 buat penting apa ga nya
        disabled: false,
        placeholder: "User's name", //tulisan abu2 lek gaada tulisan
        validator: VueFormGenerator.validators.string //kayak e buat bandingin deh
        }]
};

var schema_edit_assesi = {
  groups: [
  { summary: "FR-MPA-02.2 CEKLIS OBSERVASI-DEMONSTRASI/PRAKTEK",
  fields: [{
    type: "input",
    inputType: "text",
    label: "Judul",
    model: "judul",
    readonly: true,
    featured: true,
    disabled: true
  }, {
    type: "input",
    inputType: "text",
    label: "Nomor",
    model: "nomor",
    readonly: true,
    featured: false,
    disabled: true
  }, {
    type: "select",
    label: "TUK",
    model: "tuk",
    values: ["Sewaktu", "Tempat Kerja", "Mandiri"],
    hint: "Pilih salah satu",
    required: true
  }, {
    type: "input",
    inputType: "text",
    label: "Nama Assesor",
    model: "nama_assesor",
    readonly: false,
    disabled: false,
    placeholder: "Nama Assesor",
    validator: VueFormGenerator.validators.string

  }, {
    type: "input",
    inputType: "text",
    label: "Nama Assesi",
    model: "nama",
    readonly: false,
    featured: false,
    disabled: false,
    placeholder: "Nama Asessi", //tulisan abu2 lek gaada tulisan
    validator: VueFormGenerator.validators.string //kayak e buat bandingin deh
  }, {
    type: "input",
    inputType: "date",
    label: "Tanggal Mulai",
    model: "tgl_m"
  }, {
    type: "input",
    inputType: "date",
    label: "Tanggal Selesai",
    model: "tgl_s"
  }, {
    type: "input",
    inputType: "text",
    label: "Durasi",
    model: "durasi",
    readonly: false,
    disabled: false,
    hint: "Dalam Satuan Menit"
  }]
  }]
  

};