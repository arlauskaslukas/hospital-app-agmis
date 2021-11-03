<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use App\Models\Receptionist;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $returnable = User::all();
        return response($returnable, 200);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' =>  'required|string',
            'password' => 'required|string',
        ]);
        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password))
        {
        
            return response([
                'message' => "Invalid credentials"
            ], 401);
        }

        $token = $user->createToken('AgmisHospital')->plainTextToken;

        $cookie = cookie('JWTtoken', $token, 60*24);

        $user['token'] = $token;

        return response($user, 200)->withCookie($cookie);
    }

    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' =>  'required|string|unique:users,email',
            'password' => 'required|string',
            'profession' => 'required|string',
            'hospital_id' => 'required',
            'specialty' => 'string'
        ]);
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        $token = $user->createToken('AgmisHospital')->plainTextToken;

        if($fields['profession'] == "Doctor")
        {
            $doctor = Doctor::create([
                'specialty'=>$fields['specialty'],
                'hospital_id'=>$fields['hospital_id'],
                'user_id'=>$user['id']
            ]);
            $user['profession_data'] = $doctor;
        }
        elseif($fields['profession']=="Receptionist") {
            $receptionist = Receptionist::create([
                'hospital_id'=>$fields['hospital_id'],
                'user_id'=>$user['id']
            ]);
            $user['profession_data'] = $receptionist;
        }

        $cookie = cookie('JWTtoken', $token, 60*24);

        $user['token'] = $token;

        return response($user, 201)->withCookie($cookie);
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
        $User = new User($request->all());
        if($User->save())
        {
            return response($User,201);
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
        $User = User::find($id);
        if($User==null)
        {
            return response('',404);
        }
        return response($User, 200);
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
        $User = User::find($id);
        if($User==null) {
            return response('', 404);
        }
        $User->update($request->all());
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
        $User = User::find($id);
        if($User==null) {
            return response('', 404);
        }
        $User->delete();
        return response('', 200);
    }
}
