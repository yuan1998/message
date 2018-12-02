<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessageRequest;
use App\Message;
use App\Transformers\MessageTransformer;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function store(MessageRequest $request, Message $message)
    {
        $data = $request->all();

        $data['ip'] = $request->ip();

        $data['info'] = geoip($data['ip'])->toArray();

        $data['url'] = $request->server('HTTP_REFERER');

        $message->fill($data);

        $message->save();

        return $this->response->item($message, new MessageTransformer());
    }

    public function index(Request $request)
    {
        $query = Message::query();

        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        $data = $query->orderBy('id', 'desc')->paginate($request->get('paginate', 20));

        return $this->response->paginator($data, new MessageTransformer());
    }

    public function show(Message $message)
    {
        return $this->response->item($message, new MessageTransformer());
    }


    public function checkNew(Request $request, Message $message)
    {
        $at     = $request->at;
        $result = 200;
        $query  = $message->query();
        if ($at) {
            if ($query->where('created_at', '>', $at)->exists())
                $result = 201;
        }

        return $this->response->noContent()->setStatusCode($result);
    }

}
