<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Message;
use App\Transformers\MessageTransformer;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function store (MessageRequest $request , Message $message)
    {
        $data = $request->all();

        $data['ip'] = $request->ip();

        $data['info'] = geoip($data['ip'])->toArray();

        $message->fill($data);

        $message->save();

        return $this->response->item($message , new MessageTransformer());
    }

    public function index (Request $request , Message $message)
    {
        $query = $message->query();

        if($request->has('type')) {
            $query->where('type',$request->type);
        }
        $message->all();
        return $this->response->collection($message->all() , new MessageTransformer());
    }


    public function show ( Message $message)
    {

        return $this->response->item($message, new MessageTransformer());

    }

}
