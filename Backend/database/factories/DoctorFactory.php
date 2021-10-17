<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\Hospital;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Doctor::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $users = User::pluck('id')->toArray();
        $hospitals = Hospital::pluck('id')->toArray();
        $specialties = array("Anatomical Pathology", "Anesthesiology", "Cardiology", "Cardiovascular/Thoracic Surgery",
            "Clinical Immunology/Allergy", "Critical Care Medicine", "Dermatology", "Diagnostic Radiology",
            "Emergency Medicine", "Endocrinology and Metabolism", "Family Medicine", "Gastroenterology",
            "General Internal Medicine", "General Surgery", "General/Clinical Pathology", "Geriatric Medicine",
            "Hematology", "Medical Biochemistry", "Medical Genetics", "Medical Microbiology and Infectious Diseases",
            "Medical Oncology", "Nephrology", "Neurology", "Neurosurgery", "Nuclear Medicine", "Obstetrics/Gynecology",
            "Occupational Medicine", "Ophthalmology", "Orthopedic Surgery", "Otolaryngology", "Pediatrics",
            "Physical Medicine and Rehabilitation (PM & R)", "Plastic Surgery", "Psychiatry",
            "Public Health and Preventive Medicine (PhPm)", "Radiation Oncology", "Respirology", "Rheumatology",
            "Urology");
        return [
            "specialty" =>$this->faker->randomElement($specialties),
            "hospital_id"=>$this->faker->randomElement($hospitals),
            "user_id"=>$this->faker->randomElement($users)
        ];
    }
}
