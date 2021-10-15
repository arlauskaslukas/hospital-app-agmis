<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prescription extends Model
{
    protected $fillable = [
        "special_usage_instructions",
        "valid_until",
        "patient_id",
        "drug_id",
        "doctor_id"
    ];

    public function patient() {return $this->belongsTo(Patient::class);}
    public function drug() {return $this->belongsTo(Drug::class);}
    public function doctor() {return $this->belongsTo(Doctor::class);}

    use HasFactory;
}
