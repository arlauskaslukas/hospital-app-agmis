<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Drug extends Model
{
    protected $fillable = [
        "name",
        "active_ingredient",
        "strength",
        "side_effects",
        "contraindications"
    ];

    public function prescriptions() {return $this->hasMany(Prescription::class);}

    use HasFactory;
}
