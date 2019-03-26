<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CardController extends Controller
{

    public function index(Request $requst){


        /**
         * Validate
         *
         * people must be string, required and must not be more then 53.
         *
         */
        $input = $requst->all();



        $count= explode('.', TOTAL_CARDS / $requst->input('people'));
        $card_per_person = $count[0];
        $range = range(1, $requst->input('people'));
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
