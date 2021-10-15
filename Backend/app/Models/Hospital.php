<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hospital extends Model
{
    protected $fillable = [
        "address",
        "title"
    ];

    public function receptionists() {return $this->hasMany(Receptionist::class);}
    public function doctors() {return $this->hasMany(Doctor::class);}

    use HasFactory;
}
