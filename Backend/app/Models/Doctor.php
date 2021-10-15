<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = [
        "specialty",
        "hospital_id",
        "user_id"
    ];

    public function user() { return $this->belongsTo(User::class);}
    public function hospital() {return $this->belongsTo(Hospital::class);}
    public function appointments() { return $this->hasMany(Appointment::class);}
    public function prescriptions() {return $this->hasMany(Prescription::class);}

    use HasFactory;
}
