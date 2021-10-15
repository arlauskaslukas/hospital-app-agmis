<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        "full_name",
        "possible_contraindications",
        "age",
        "email"
    ];

    public function prescriptions() {return $this->hasMany(Prescription::class);}
    public function appointments() {return $this->hasMany(Appointment::class);}

    use HasFactory;
}
