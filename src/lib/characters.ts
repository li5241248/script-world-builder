import wentang from "@/assets/char-wentang.jpg";
import peirong from "@/assets/char-peirong.jpg";
import peiyan from "@/assets/char-peiyan.jpg";
import peiyu from "@/assets/char-peiyu.jpg";
import mama from "@/assets/char-mama.jpg";
import empress from "@/assets/char-empress.jpg";

export type Relation = { id: string; label: string };

export type Character = {
  id: string;
  name: string;
  role: string;
  gender: "女" | "男";
  age: number;
  tag: string;
  img: string;
  desc: string;
  played: number;
  motto?: string;
  identity: string;
  personality: string;
  skill: string;
  secret: string;
  story: string;
  relations: Relation[];
};

export const CHARACTERS: Character[] = [
  {
    id: "peiyan", name: "裴琰", role: "三皇子", gender: "男", age: 9, tag: "皇子", img: peiyan, played: 9821,
    desc: "废妃周氏所出，后记于温棠名下。早熟讨好，藏锋于稚气之下，终登大宝。",
    motto: "「生病的琰儿，才是有用的。」",
    identity: "大梁三皇子，废妃周氏所出，后记于温棠名下，终登大宝",
    personality: "早熟讨好，心思深沉，藏锋于稚气之下",
    skill: "察言观色，审时度势",
    secret: "九岁那年，他靠着生母渐渐冰凉的身躯躺下来，心满意足地笑了",
    story: "自记事起便明白：生病的琰儿，才是有用的。母妃的拥抱有期限，父皇的怜悯有定价，他用一次次发烧换来短暂的温存。母妃死时，他一滴眼泪也没掉。他以为自己这一生再也不会哭——直到被记到温棠名下，直到她为他熬夜改一件袖子短了半截的冬衣，直到她吹凉一勺药、烤暖一片橘瓣递到他唇边。他想说，我是故意陷害你的。可一定是药太苦了，不然他怎么解释，自己竟然泪如雨下。",
    relations: [
      { id: "wentang", label: "知己" },
      { id: "peirong", label: "父子" },
      { id: "peiyu", label: "兄弟" },
      { id: "empress", label: "嫡母" },
    ],
  },
  {
    id: "wentang", name: "温棠", role: "女主 · 妃子", gender: "女", age: 24, tag: "贵妃", img: wentang, played: 12483,
    desc: "太仓知州之女，十四岁入宫，无宠无依十年。不争不抢，只把寻常人家的暖一样样做下去。",
    motto: "「日子坏不到哪里去。」",
    identity: "太仓知州之女，大梁贵妃，后册为皇后",
    personality: "温和安分，慈心柔肠",
    skill: "羹汤糕点，女红糖画",
    secret: "怀中始终揣着一块母亲教做的枣花糕方子，十年未曾忘过家",
    story: "幼时家中遭贬，是阿娘煮了一碗红豆甜汤，告诉她日子坏不到哪里去。十四岁奉旨入宫，以为不过是出门做客，晚些时候就能回家。一入宫门，十年不见爹娘。无宠无依，亲生子被抱去坤宁宫养大，六岁便不认她。她不会争，不会抢，只把母亲教的糖画毽子、红豆甜汤，一样样在深宫里慢慢做下去——直到某个雪夜，有人推开窗，看见她回头一笑。",
    relations: [
      { id: "peiyan", label: "知己" },
      { id: "peirong", label: "君妃" },
      { id: "empress", label: "宫规" },
      { id: "mama", label: "心腹" },
    ],
  },
  {
    id: "peirong", name: "裴容", role: "皇上", gender: "男", age: 42, tag: "九五至尊", img: peirong, played: 4216,
    desc: "少年登基，于权臣与美色之间疲惫多年。雪夜窗外那一笑，竟让他怔愣了很久。",
    motto: "「孤家寡人，方得天下。」",
    identity: "大梁帝王，年号开元",
    personality: "喜怒不形于色，多疑而疲惫",
    skill: "驭下制衡，识人辨心",
    secret: "厌恶赵氏一族久矣，却隐忍十余年未动",
    story: "少年登基，中宫是赵氏，贵妃是周氏，一个挟外戚之威，一个仗盛宠之骄。他批奏折到深夜，各宫汤食堆得连笔架都放不下，他一碗也喝不下。见惯了端方的笑、妖娆的笑、算计的笑，他几乎以为天下女子皆是如此。直到那年雪夜，他站在采桑宫窗外，看见炉上温着红豆汤，有人膝头伏着个孩子，无意地回过头来朝他笑。那一刻，见惯了美色和手段的帝王，竟也怔愣了很久很久。",
    relations: [
      { id: "wentang", label: "君妃" },
      { id: "empress", label: "夫妻" },
      { id: "peiyan", label: "父子" },
      { id: "peiyu", label: "父子" },
    ],
  },
  {
    id: "peiyu", name: "裴瑜", role: "四皇子", gender: "男", age: 8, tag: "皇子", img: peiyu, played: 3580,
    desc: "温棠所出，养于坤宁宫。聪慧骄矜，早慧狠辣，学得比谁都快。",
    motto: "「你只是个贵人，并不配做我的母亲。」",
    identity: "大梁四皇子，温棠所出，养于坤宁宫",
    personality: "聪慧骄矜，早慧狠辣",
    skill: "察言观色，投其所好",
    secret: "雪团子里藏的那块石子，是他亲手包进去的",
    story: "六岁那年他推开生母：「三哥的母妃是周贵妃，你只是个贵人，并不配做我的母亲。」皇后教他什么是体面、什么是出身、什么是配与不配，他学得比谁都快。他知道怎么让兄弟姊妹哄笑着跑开，怎么让仇公公替他撑腰，怎么让生母在雪地里站一整天而他一次都不必回头。直到皇后倒台那日，他提着食盒站在采桑宫外——如当年她站在雪地里等他那样。他终于懂了：有些话说出口，是收不回来的。",
    relations: [
      { id: "peirong", label: "父子" },
      { id: "empress", label: "母子" },
      { id: "peiyan", label: "兄弟" },
      { id: "wentang", label: "敌友" },
    ],
  },
  {
    id: "empress", name: "皇后", role: "中宫之主", gender: "女", age: 36, tag: "凤仪", img: empress, played: 2914,
    desc: "赵将军之妹，端方持重，绵里藏针。这把铰剪以为可以剪到天荒地老。",
    motto: "「这宫里，从来不许人想得太多。」",
    identity: "大梁中宫，赵将军之妹",
    personality: "端方持重，绵里藏针",
    skill: "执掌六宫，平衡前朝",
    secret: "二十年前那场画堂血案，她也曾推过一把",
    story: "她出身将门，十六岁封后，十余载执掌凤印。她无所出，便抱走了别人的孩子；她要保住中宫，便在废妃的饮食里下了砒霜。她以为兄长的军功是她的底气，养大的瑜儿是她的依仗，这把铰剪可以剪到天荒地老。直到那个雨夜，兄长醉酒，溺死在一湾浅浅的水洼里。她坐在凤位上，听着旧案一桩桩翻出来，忽然想起很多年前——她也曾是个想做母亲的女子。只是这宫里，从来不许人想得太多。",
    relations: [
      { id: "peirong", label: "夫妻" },
      { id: "peiyu", label: "母子" },
      { id: "wentang", label: "宫规" },
      { id: "peiyan", label: "嫡母" },
    ],
  },
  {
    id: "mama", name: "陈嬷嬷", role: "采桑宫掌事嬷嬷", gender: "女", age: 46, tag: "心腹", img: mama, played: 1207,
    desc: "温棠同乡，曾为四皇子乳母。刀子嘴豆腐心，一边劝着，一边念着菩萨保佑。",
    motto: "「贵人慈心，可千万不要犯糊涂。」",
    identity: "温棠同乡，采桑宫掌事嬷嬷，曾为四皇子乳母",
    personality: "刀子嘴豆腐心，见多识广",
    skill: "养育孩童，辨毒识药，看人下菜碟",
    secret: "她半生在宫中，见过太多慈心人惨死，却从未学会狠心",
    story: "她进宫四十年，看着一茬茬妃嫔进来，又一茬茬被抬出去。她是温棠初入宫时的照拂之人，在饮食上处处提防，才让那位无依无靠的小贵人平安生下了瑜儿。她见过的宫闱风浪太多——慈心是福是祸，她从来不敢笃定。她不止一次劝温棠：「贵人慈心，可千万不要犯糊涂，还是要有自己的孩子。」可她每劝一句，便念一句菩萨保佑——她到底盼着，这一回赌对了。",
    relations: [
      { id: "wentang", label: "心腹" },
      { id: "empress", label: "敬畏" },
    ],
  },
];

export const getCharacter = (id: string) => CHARACTERS.find((c) => c.id === id);
