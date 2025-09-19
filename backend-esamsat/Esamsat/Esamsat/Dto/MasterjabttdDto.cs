namespace Esamsat.Dto
{
    public class MasterjabttdDto
    {
        public long Idjabttd { get; set; }

        public long Idpegawai { get; set; }

        public string Kddok { get; set; } = null!;

        public string? Jabatan { get; set; }

        public string? Ket { get; set; }

        public string? Status { get; set; }

        public string? Createby { get; set; }

        public DateTime? Createdate { get; set; }

        public string? Updateby { get; set; }

        public DateTime? Updatedate { get; set; }
    }

    public class CreateMasterjabttdDto
    {

        public long Idpegawai { get; set; }

        public string Kddok { get; set; } = null!;

        public string? Jabatan { get; set; }

        public string? Ket { get; set; }

        public string? Status { get; set; }

        public string? Createby { get; set; }

        public DateTime? Createdate { get; set; }
    }
    public class UpdateMasterjabttdDto
    {

        public long Idpegawai { get; set; }

        public string Kddok { get; set; } = null!;

        public string? Jabatan { get; set; }

        public string? Ket { get; set; }

        public string? Status { get; set; }

        public string? Updateby { get; set; }

        public DateTime? Updatedate { get; set; }
    }
}
