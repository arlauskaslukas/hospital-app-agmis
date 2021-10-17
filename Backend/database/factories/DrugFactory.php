<?php

namespace Database\Factories;

use App\Models\Drug;
use Illuminate\Database\Eloquent\Factories\Factory;

class DrugFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Drug::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
            "name" => $this->faker->domainWord(),
            "active_ingredient"=>$this->faker->domainWord(),
            "strength"=>$this->faker->numberBetween(1,1000),
            "side_effects"=>$this->faker->words(5,true),
            "contraindications"=>$this->faker->words(5,true),
        ];
    }
}
