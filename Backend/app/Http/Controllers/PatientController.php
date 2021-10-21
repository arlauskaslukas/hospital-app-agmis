<?php

namespace App\Http\Controllers;

use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Request;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $returnable = Patient::all();
        return response($returnable, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $Patient = new Patient($request->all());
        if($Patient->save())
        {
            return response($Patient,201);
        }
        return response('',409);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $Patient = Patient::find($id);
        if($Patient==null)
        {
            return response('',404);
        }
        return response($Patient, 200);
    }

    public function patient_data($id) {
        $Patient = Patient::find($id);
        if($Patient==null)
        {
            return response('',404);
        }
        $appointments = $Patient->appointments()->get();
        
        $Patient["appointments"] = $appointments;
        $prescriptions = $Patient->prescriptions()->get();
        foreach($prescriptions as $prescription) {
            $drug = $prescription->drug()->get();
            $doctor = $prescription->doctor()->get()[0];
            $personal_data = $doctor->user()->get()[0];
            $doctor['personal_data'] = $personal_data;
            $prescription['drug'] = $drug;
            $prescription['doctor'] = $doctor;
        }
        $Patient['prescriptions'] = $prescriptions;
        return response($Patient, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $Patient = Patient::find($id);
        if($Patient==null) {
            return response('', 404);
        }
        $Patient->update($request->all());
        return response('', 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $Patient = Patient::find($id);
        if($Patient==null) {
            return response('', 404);
        }
        $Patient->delete();
        return response('', 200);
    }
}
