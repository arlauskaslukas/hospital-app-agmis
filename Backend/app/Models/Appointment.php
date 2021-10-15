<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        "appointment_reason",
        "diagnosis",
        "appointment_time",
        "receptionist_id",
        "patient_id",
        "doctor_id"
    ];
    protected $casts = [
        "appointment_time"=>"datetime"
    ];

    public function receptionist() { return $this->belongsTo(Receptionist::class);}
    public function doctor() { return $this->belongsTo(Doctor::class);}
    public function patient() { return $this->belongsTo(Patient::class);}

    use HasFactory;
}
