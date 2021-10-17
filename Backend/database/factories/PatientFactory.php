<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

class PatientFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Patient::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            "full_name" => $this->faker->name(),
            "possible_contraindications"=>$this->faker->text(),
            "age"=>$this->faker->numberBetween(1,90),
            "email"=>$this->faker->email()
        ];
    }
}
