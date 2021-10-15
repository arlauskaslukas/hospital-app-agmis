<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receptionist extends Model
{
    protected $fillable = [
        "user_id",
        "hospital_id"
    ];

    public function user() { return $this->belongsTo(User::class);}
    public function appointments() { return $this->hasMany(Appointment::class);}
    public function hospital() {return $this->belongsTo(Hospital::class);}
    use HasFactory;
}
