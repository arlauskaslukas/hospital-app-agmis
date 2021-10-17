<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Drug;
use App\Models\Patient;
use App\Models\Prescription;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrescriptionFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Prescription::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $doctors = Doctor::pluck('id')->toArray();
        $drugs = Drug::pluck('id')->toArray();
        $patients = Patient::pluck('id')->toArray();
        return [
            "special_usage_instructions" => $this->faker->text(),
            "valid_until" => $this->faker->dateTime(new \DateTime("2022-12-30 00:00:00"), "UTC"),
            "patient_id" => $this->faker->randomElement($patients),
            "drug_id" => $this->faker->randomElement($drugs),
            "doctor_id" => $this->faker->randomElement($doctors)
        ];
    }
}
