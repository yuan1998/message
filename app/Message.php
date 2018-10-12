<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $fillable = [
        'name',
        'phone',
        'comment',
        'gender',
        'project',
        'age',
        'ip',
        'info',
        'other',
        'type'
    ];

    protected $casts = [
        'other' => 'json',
        'info' => 'json',
    ];



}
