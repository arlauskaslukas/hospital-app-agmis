<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $returnable = Appointment::all();
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
        $appointment = new Appointment($request->validated());
        if($appointment->save())
        {
            return response($appointment,201);
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
        $appointment = Appointment::find($id);
        if($appointment==null)
        {
            return response('',404);
        }
        return response($appointment, 200);
    }

    public function appointment_data($id)
    {
        $appointment = Appointment::find($id);
        if($appointment==null)
        {
            return response('', 404);
        }
        $doctor = $appointment->doctor()->get()[0];
        $doc_user_data = $doctor->user()->get()[0];
        $doctor['user_data'] = $doc_user_data;
        $receptionist = $appointment->receptionist()->get()[0];
        $rec_user_data = $receptionist->user()->get()[0];
        $receptionist['user_data'] = $rec_user_data;
        $patient = $appointment->patient()->get()[0];
        $appointment['doctor'] = $doctor;
        $appointment['receptionist'] = $receptionist;
        $appointment['patient'] = $patient;
        return response($appointment, 200);
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
        $appointment = Appointment::find($id);
        if($appointment==null) {
            return response('', 404);
        }
        $appointment->update($request->validated());
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
        $appointment = Appointment::find($id);
        if($appointment==null) {
            return response('', 404);
        }
        $appointment->delete();
        return response('', 200);
    }
}
