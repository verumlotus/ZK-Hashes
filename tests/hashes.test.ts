import { mimcHash } from "../src/hashes/mimcSponge";
import {poseidon} from "../src/hashes/poseidon";
import { inputs } from "./inputOutput";
import { BN128_PRIME, VESTA_PRIME, PALLAS_PRIME } from "../src/hashes/constants";
// import { Ok, Err, Result } from "ts-results";

// Verifying JS Libraries match with CircomLib output
describe("MimcBN128", () => {
    const PRIME_CURVE = BN128_PRIME;
    it("positiveNumber", () => {
        // Num iterations = 220, key = 12
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const num_iterations = 220;
        const key = BigInt(12);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("4461432677172336824418814573703057640945545961921058491712912892595903902118"));
    })
    it("negativeNumber", () => {
        // Num iterations = 211, key = 900
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const num_iterations = 211;
        const key = BigInt(900);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("6213774002967914397523395822807914809105290069651663353468649348524194433652"));
    })
    it("overflowNumber", () => {
        // Num iterations = 187, key = 2
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const num_iterations = 187;
        const key = BigInt(2);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("1652748787280305791003052112023614845645000033769982073814518998091025788598"));
    })
    it("simpleArrayShort", () => {
        // Num iterations = 219, key = 7
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const num_iterations = 219;
        const key = BigInt(7);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("9163458729317902996979304919878739830537582438161074387490291767340360840985"));
    })
    it("simpleArrayLong", () => {
        // Num iterations = 117, key = 3456
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const num_iterations = 117;
        const key = BigInt(3456);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("18266212716526074266605924953738472907975966420064116550458055612803684335619"));
    })
    it("complexArrayNegatives", () => {
        // Num iterations = 181, key = 0
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const num_iterations = 181;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("644602865236917251718162161997568837828677511196005913290723810797897279702"));
    })
    it("complexArrayOverflows", () => {
        // Num iterations = 208, key = 77
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const num_iterations = 208;
        const key = BigInt(77);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("16056100543132141196167326806921271085749252700115893648820796452686373850357"));
    })
    it("2DArraySimple", () => {
        // Num iterations = 200, key = 20
        const hash_inputs = inputs['2DArraySimple'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 200;
        const key = BigInt(20);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("7791320094710154790029759622725503065814531517402155941626002724332901633656"));
    })
    it("2DArrayNegatives", () => {
        // Num iterations = 217, key = 218
        const hash_inputs = inputs['2DArrayNegatives'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 217;
        const key = BigInt(218);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("13071366733944871372949294168015678105887661555742525870234659209245509701488"));
    })
    it("2DArrayOverflows", () => {
        // Num iterations = 212, key = 5001
        const hash_inputs = inputs['2DArrayOverflows'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 212;
        const key = BigInt(5001);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("16868075657917333696542907055577222940014678628079087874311505717893483647145"));
    })
    it("3DArrayNegatives", () => {
        // Num iterations = 220, key = 0
        const hash_inputs = inputs['3DArrayNegatives'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 220;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("21865030777828483721814814140605586061033847637133116016794408111123908573563"));
    })
    it("3DArrayOverflows", () => {
        // Num iterations = 219, key = 42
        const hash_inputs = inputs['3DArrayOverflows'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 219;
        const key = BigInt(42);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("11103571403184333388678300158844507410532454363643595465412138681918501733988"));
    })
});

describe("MimcVesta", () => {
    const PRIME_CURVE = VESTA_PRIME;
    it("positiveNumber", () => {
        // Num iterations = 220, key = 12
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const num_iterations = 220;
        const key = BigInt(12);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("1654567182447334039904588511634377696392441651493422865023230719765285050478"));
    })
    it("negativeNumber", () => {
        // Num iterations = 211, key = 900
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const num_iterations = 211;
        const key = BigInt(900);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("23322411722294961293154728533911175966085529500718780112883819924705600979466"));
    })
    it("overflowNumber", () => {
        // Num iterations = 187, key = 2
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const num_iterations = 187;
        const key = BigInt(2);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("21224565437802952033028951800569414695938605952333765886296646293179406535156"));
    })
    it("simpleArrayShort", () => {
        // Num iterations = 219, key = 7
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const num_iterations = 219;
        const key = BigInt(7);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("18231055313224040875288140283605707435288817585030402405567679395785390030442"));
    })
    it("simpleArrayLong", () => {
        // Num iterations = 117, key = 3456
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const num_iterations = 117;
        const key = BigInt(3456);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("6739361090561553799332999487896277552744509378541134953673160599764206772227"));
    })
    it("complexArrayNegatives", () => {
        // Num iterations = 181, key = 0
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const num_iterations = 181;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("9831340276516727565092941267199409680690813270021062585333490554406844529341"));
    })
    it("complexArrayOverflows", () => {
        // Num iterations = 208, key = 77
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const num_iterations = 208;
        const key = BigInt(77);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("14802111098103368463811035410388403916033724353946291247065993624092104640390"));
    })
    it("2DArraySimple", () => {
        // Num iterations = 200, key = 20
        const hash_inputs = inputs['2DArraySimple'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 200;
        const key = BigInt(20);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("14895791434685078586208781139183751273457065000482321837091813672044378558675"));
    })
    it("2DArrayNegatives", () => {
        // Num iterations = 217, key = 218
        const hash_inputs = inputs['2DArrayNegatives'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 217;
        const key = BigInt(218);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("11109489032682303612667797382042342021917569740893157612475597106956626223490"));
    })
    it("2DArrayOverflows", () => {
        // Num iterations = 212, key = 5001
        const hash_inputs = inputs['2DArrayOverflows'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 212;
        const key = BigInt(5001);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("22781050323142220293153514945308268641944846088748653354152938441368169429503"));
    })
    it("3DArrayNegatives", () => {
        // Num iterations = 220, key = 0
        const hash_inputs = inputs['3DArrayNegatives'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 220;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("16301003253950287916147310625057699495443629298161102065022040419505913255430"));
    })
    it("3DArrayOverflows", () => {
        // Num iterations = 219, key = 42
        const hash_inputs = inputs['3DArrayOverflows'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 219;
        const key = BigInt(42);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("17757952548250296356374185437392565573606852125119276243386938645931573837960"));
    })
});

describe("MimcPallas", () => {
    const PRIME_CURVE = PALLAS_PRIME;
    it("positiveNumber", () => {
        // Num iterations = 220, key = 12
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const num_iterations = 220;
        const key = BigInt(12);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("3339755118709645658666678595906893413131888450586088951280957291919193644675"));
    })
    it("negativeNumber", () => {
        // Num iterations = 211, key = 900
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const num_iterations = 211;
        const key = BigInt(900);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("25963962968894471555739912111518906887605441883415119837862890042508232039827"));
    })
    it("overflowNumber", () => {
        // Num iterations = 187, key = 2
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const num_iterations = 187;
        const key = BigInt(2);
        const value = mimcHash([hash_inputs], num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("24925084366218263856018622710874468648770102731124459115903653310509898476154"));
    })
    it("simpleArrayShort", () => {
        // Num iterations = 219, key = 7
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const num_iterations = 219;
        const key = BigInt(7);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("18298376725664837274208168013424353477222252601231761876723163017200823202260"));
    })
    it("simpleArrayLong", () => {
        // Num iterations = 117, key = 3456
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const num_iterations = 117;
        const key = BigInt(3456);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("8042514900383995475499353072200369885853791237908112562056120056343825810637"));
    })
    it("complexArrayNegatives", () => {
        // Num iterations = 181, key = 0
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const num_iterations = 181;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("21778273891272595747586001329786774883594316339411656355041540051343102930002"));
    })
    it("complexArrayOverflows", () => {
        // Num iterations = 208, key = 77
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const num_iterations = 208;
        const key = BigInt(77);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("7729274130787385913946845115156600975418092448982173323076501401512638385320"));
    })
    it("2DArraySimple", () => {
        // Num iterations = 200, key = 20
        const hash_inputs = inputs['2DArraySimple'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 200;
        const key = BigInt(20);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("16663165873486729456742358720899145285783541049520841162546414905828255411185"));
    })
    it("2DArrayNegatives", () => {
        // Num iterations = 217, key = 218
        const hash_inputs = inputs['2DArrayNegatives'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 217;
        const key = BigInt(218);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("15251702377236305123396996797527803552171022507493021275408678973649403889083"));
    })
    it("2DArrayOverflows", () => {
        // Num iterations = 212, key = 5001
        const hash_inputs = inputs['2DArrayOverflows'].flatMap((arr) => {return arr.flatMap((elem) => BigInt(elem))});
        const num_iterations = 212;
        const key = BigInt(5001);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("20818559579998109267040929376293509099060295609983962626455146461071595970902"));
    })
    it("3DArrayNegatives", () => {
        // Num iterations = 220, key = 0
        const hash_inputs = inputs['3DArrayNegatives'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 220;
        const key = BigInt(0);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("21602257479830742584819165142361004470698399715854798046750386683999371638063"));
    })
    it("3DArrayOverflows", () => {
        // Num iterations = 219, key = 42
        const hash_inputs = inputs['3DArrayOverflows'].flatMap((outerArr) => {return outerArr.flatMap((innerArr) => {return innerArr.flatMap((elem) => BigInt(elem))})});
        const num_iterations = 219;
        const key = BigInt(42);
        const value = mimcHash(hash_inputs, num_iterations, key, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("23406435871006136867719230170063791898420165115265180336086164437789967382738"));
    })
});

describe("PoseidonBN128", () => {
    const PRIME_CURVE = BN128_PRIME;
    it("positiveNumber", () => {
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("11024901771116949281439297249605340934193999343139303500877431078598017845296"));
    })
    it("negativeNumber", () => {
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("11490148337724420420912450372975302114894269356345709364634300786610043986485"));
    })
    it("overflowNumber", () => {
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("15970808272900188785661066752035896035451494135794687520863025511127518928880"));
    })
    it("simpleArrayShort", () => {
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("7853200120776062878684798364095072458815029376092732009249414926327459813530"));
    })
    it("simpleArrayLong", () => {
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("9989051620750914585850546081941653841776809718687451684622678807385399211877"));
    })
    it("complexArrayNegatives", () => {
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("16796394920210585789299853366062574112889650830197092886945270799342845771718"));
    })
    it("complexArrayOverflows", () => {
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("6529707052067813039955866271971386650127580860546035969456336359008128413277"));
    })
});

describe("PoseidonVesta", () => {
    const PRIME_CURVE = VESTA_PRIME;
    it("positiveNumber", () => {
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("23733976976414888001660413346305624205744824523429734758312012492418735954328"));
    })
    it("negativeNumber", () => {
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("24320619480144032554185991155558101691509079895560984942352217294482804860568"));
    })
    it("overflowNumber", () => {
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("23697485157146113673377029657402970166092705919854725900568744835623020530161"));
    })
    it("simpleArrayShort", () => {
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("10148246943864975455840209516398831844995242484352636702637979101131422116154"));
    })
    it("simpleArrayLong", () => {
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("869745613889833139239288102738313040476721491229522417864412672019243598501"));
    })
    it("complexArrayNegatives", () => {
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("7697562277518282090557566979807914191114042855950597667441713226761695823063"));
    })
    it("complexArrayOverflows", () => {
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("17246560327897202953724949988969747926373060247798295321263696555454779563275"));
    })
});

describe("PoseidonPallas", () => {
    const PRIME_CURVE = PALLAS_PRIME;
    it("positiveNumber", () => {
        const hash_inputs = BigInt(inputs['positiveNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("28919592630999569323302984497920804797167666283849788833807547835007700644174"));
    })
    it("negativeNumber", () => {
        const hash_inputs = BigInt(inputs['negativeNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("27982280672015973097725106135218557667068277542542588166186325337780483131631"));
    })
    it("overflowNumber", () => {
        const hash_inputs = BigInt(inputs['overflowNumber']);
        const value = poseidon([hash_inputs], PRIME_CURVE);
        expect(value.val).toEqual(BigInt("18294296584484560146040523829038751491914771540010276573799457040406534909914"));
    })
    it("simpleArrayShort", () => {
        const hash_inputs = inputs['simpleArrayShort'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("14792878798440964934508775221203923499126800635721117168085639668204326383278"));
    })
    it("simpleArrayLong", () => {
        const hash_inputs = inputs['simpleArrayLong'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("11296472251293339874490919561801765697411776226270738639175529778673046547211"));
    })
    it("complexArrayNegatives", () => {
        const hash_inputs = inputs['complexArrayNegatives'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("105403280649630770723845173869782822418399702753946304343216619243806771967"));
    })
    it("complexArrayOverflows", () => {
        const hash_inputs = inputs['complexArrayOverflows'].flatMap((elem) => BigInt(elem));
        const value = poseidon(hash_inputs, PRIME_CURVE);
        expect(value.val).toEqual(BigInt("23586116266802187086432758021561215556078662809877408137345473762983847783186"));
    })
});

export {}