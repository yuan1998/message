<?php

namespace App\Transformers;

use App\Message;
use League\Fractal\TransformerAbstract;

class MessageTransformer extends TransformerAbstract
{


    public function transform(Message $message)
    {
        $result = [
            'id'         => $message->id,
            'name'       => $message->name,
            'phone'      => $message->phone,
            'comment'    => $message->comment,
            'gender'     => $message->gender == 1 ? '男' : '女',
            'project'    => $message->project,
            'ip'         => $message->ip,
            'url'         => $message->url,
            'age'         => $message->age,
            'info'       => $message->info,
            'type'       => $message->type == 'zx' ? '整形' : '口腔',
            'create_at'  => $message->created_at->toDateTimeString(),
            'updated_at' => $message->updated_at->toDateTimeString(),
        ];


        return $result;
    }

}

