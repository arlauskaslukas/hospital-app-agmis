<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Receptionist;
use App\Models\Doctor;
use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class AppointmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Appointment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $doctors = Doctor::pluck('id')->toArray();
        $receptionists = Receptionist::pluck('id')->toArray();
        $patients = Patient::pluck('id')->toArray();
        return [
            "appointment_reason" =>$this->faker->words(5, true),
            "diagnosis" => "",
            "appointment_time" => $this->faker->dateTime(new \DateTime("2022-12-30 00:00:00"), "UTC"),
            "receptionist_id" => $this->faker->randomElement($receptionists),
            "patient_id" => $this->faker->randomElement($patients),
            "doctor_id" => $this->faker->randomElement($doctors)
        ];
    }
}
