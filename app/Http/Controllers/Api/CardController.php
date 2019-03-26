<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class CardController extends Controller
{

    public function index(Request $request){


        $validatedData = Validator::make($request->all(),
            [
                'people' => 'required|numeric|max:52',
            ]
        );

        if ($validatedData->fails()) {

            return response()->json(['errors' => $validatedData->getMessageBag()->toArray()])->setStatusCode(422);
        }

        $input = $request->all();

        $count= explode('.', TOTAL_CARDS / $request->input('people'));
        $card_per_person = $count[0];
        $range = range(1, $request->input('people'));
        $cards = config('card.cards');

        $card_stack = [];

        foreach ($cards as $key => $card) {
            $cards[$key] = array_merge($cards[$key], ['page'=> config('card.pages')]);
            foreach(config('card.pages') as $page){
                array_push($card_stack, ['card'=> $card, 'page' => $page]);
            }
        }

        $peoples = [];
        foreach($range as $people){

            $card_set = [];
            for($i=1; $i <= $card_per_person; $i++){

                // generate a key between 0 to last key of $card_stack;
                $random_key = rand(0, count($card_stack) -1 );

                if(isset($card_stack[$random_key])){
                    $pick = $card_stack[$random_key];
                    array_push($card_set, $pick);

                    // remove the picked key from the stack
                    unset($card_stack[$random_key]);

                    // re-indexing the array key
                    $card_stack = array_values($card_stack);
                }

            }

            array_push($peoples, [$people, $card_set]);

        }


        return response()->json(['peoples' => $peoples, 'cards' => $card_stack, 'per_person' => $card_per_person]);

    }
}
