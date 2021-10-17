<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\Receptionist;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReceptionistFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Receptionist::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::pluck('id')->toArray();
        $hospitals = Hospital::pluck('id')->toArray();
        $doctors = Doctor::pluck('user_id')->toArray();
        $freeIndices = array_diff($users, $doctors);
        return [
            "hospital_id"=>$this->faker->randomElement($hospitals),
            "user_id"=>$this->faker->randomElement($freeIndices)
        ];
    }
}
