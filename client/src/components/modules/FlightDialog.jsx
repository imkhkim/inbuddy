import { Button } from "@/components/atoms/Button";
import { P } from "@/components/atoms/P";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { Calendar } from "@/components/atoms/calendar";
import { useDispatch } from "react-redux"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
    DialogClose,
    DialogFooter,
    DialogDescription,
    DialogTitle,
} from "@/components/atoms/dialog"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/atoms/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/atoms/command"



function FlightDialog({ journeyId }) {

    const [flightDate, setFlightDate] = useState();
    const [openCalander, setOpenCalander] = useState(false);

    const [openAirlineList, setOpenAirlineList] = useState(false)
    const [myAirline, setMyAirline] = useState("");
    const [myAirlineCode, setMyAirlineCode] = useState("");

    const [flightNumber, setFlightNumber] = useState("");

    const handleFlightNumberChange = (e) => {
        setFlightNumber(e.target.value);
    };

    const dispath = useDispatch();

    const addFlight = () => ({
        type: 'journey/addFlight',
        payload: {
            "journeyId": journeyId,
            "flightInfo": {
                "departureDate": flightDate.toLocaleDateString(),
                "flightCode": `${myAirlineCode}${flightNumber}`,
                "departureAirportIATA": "ICN",
                "arrivalAirportIATA": "미완",
                "flightTime": "미완",
                "departureTime": {
                    "timeZone": "UTC+09:00",
                    "time": "10:20"
                },
                "arrivalTime": {
                    "timeZone": "UTC+09:00",
                    "time": "12:50"
                },
                "departureAirportName": "인천",
                "arrivalAirportName": "미완"
            }
        }
    })



    // 예시 코드 모음집
    const airlines = [
        {
            "value": "ITA항공",
            "airlineCode": "AZ"
        },
        {
            "value": "KLM네덜란드항공",
            "airlineCode": "KL"
        },
        {
            "value": "S7항공",
            "airlineCode": "S7"
        },
        {
            "value": "가루다인도네시아",
            "airlineCode": "GA"
        },
        {
            "value": "그레이터베이항공",
            "airlineCode": "HB"
        },
        {
            "value": "대한항공",
            "airlineCode": "KE"
        },
        {
            "value": "델타항공",
            "airlineCode": "DL"
        },
        {
            "value": "라오항공",
            "airlineCode": "QV"
        },
        {
            "value": "란항공",
            "airlineCode": "LA"
        },
        {
            "value": "로얄 에어 모로코",
            "airlineCode": "AT"
        },
        {
            "value": "로얄 요르단 항공",
            "airlineCode": "RJ"
        },
        {
            "value": "말레이시아 항공",
            "airlineCode": "MH"
        },
        {
            "value": "몽골항공",
            "airlineCode": "OM"
        },
        {
            "value": "바틱 에어 말레이시아",
            "airlineCode": "OD"
        },
        {
            "value": "버진 애트란틱항공",
            "airlineCode": "VS"
        },
        {
            "value": "버진 오스트레일리아",
            "airlineCode": "VA"
        },
        {
            "value": "베트남항공",
            "airlineCode": "VN"
        },
        {
            "value": "비스타라항공",
            "airlineCode": "UK"
        },
        {
            "value": "비엣젯항공",
            "airlineCode": "VJ"
        },
        {
            "value": "사우디아항공",
            "airlineCode": "SV"
        },
        {
            "value": "산동항공",
            "airlineCode": "SC"
        },
        {
            "value": "상하이항공",
            "airlineCode": "FM"
        },
        {
            "value": "샤먼항공",
            "airlineCode": "MF"
        },
        {
            "value": "세부퍼시픽항공",
            "airlineCode": "5J"
        },
        {
            "value": "스리랑카항공",
            "airlineCode": "UL"
        },
        {
            "value": "스카이 앙코르 항공",
            "airlineCode": "ZA"
        },
        {
            "value": "스쿠트타이거항공",
            "airlineCode": "TR"
        },
        {
            "value": "심천항공",
            "airlineCode": "ZH"
        },
        {
            "value": "싱가포르항공",
            "airlineCode": "SQ"
        },
        {
            "value": "아르헨티나 항공",
            "airlineCode": "AR"
        },
        {
            "value": "아메리칸항공",
            "airlineCode": "AA"
        },
        {
            "value": "아시아나항공",
            "airlineCode": "OZ"
        },
        {
            "value": "아에로멕시코",
            "airlineCode": "AM"
        },
        {
            "value": "에미레이트항공",
            "airlineCode": "EK"
        },
        {
            "value": "에바항공",
            "airlineCode": "BR"
        },
        {
            "value": "에어캐나다",
            "airlineCode": "AC"
        },
        {
            "value": "에어타히티누이",
            "airlineCode": "TN"
        },
        {
            "value": "에어프랑스",
            "airlineCode": "AF"
        },
        {
            "value": "에티오피아항공",
            "airlineCode": "ET"
        },
        {
            "value": "엘알 이스라엘 항공",
            "airlineCode": "LY"
        },
        {
            "value": "오스트리아항공",
            "airlineCode": "OS"
        },
        {
            "value": "우즈베키스탄항공",
            "airlineCode": "HY"
        },
        {
            "value": "웨스트젯",
            "airlineCode": "WS"
        },
        {
            "value": "이베리아항공",
            "airlineCode": "IB"
        },
        {
            "value": "이집트항공",
            "airlineCode": "MS"
        },
        {
            "value": "일본항공",
            "airlineCode": "JL"
        },
        {
            "value": "제트스타",
            "airlineCode": "JQ"
        },
        {
            "value": "중국동방항공",
            "airlineCode": "MU"
        },
        {
            "value": "중국남방항공",
            "airlineCode": "CZ"
        },
        {
            "value": "중국항공",
            "airlineCode": "CA"
        },
        {
            "value": "카타르항공",
            "airlineCode": "QR"
        },
        {
            "value": "캐세이퍼시픽항공",
            "airlineCode": "CX"
        },
        {
            "value": "케냐항공",
            "airlineCode": "KQ"
        },
        {
            "value": "코파항공",
            "airlineCode": "CM"
        },
        {
            "value": "쿠웨이트항공",
            "airlineCode": "KU"
        },
        {
            "value": "타이항공",
            "airlineCode": "TG"
        },
        {
            "value": "터키항공",
            "airlineCode": "TK"
        },
        {
            "value": "티웨이항공",
            "airlineCode": "TW"
        },
        {
            "value": "파키스탄항공",
            "airlineCode": "PK"
        },
        {
            "value": "필리핀항공",
            "airlineCode": "PR"
        },
        {
            "value": "핀에어",
            "airlineCode": "AY"
        },
        {
            "value": "하와이안항공",
            "airlineCode": "HA"
        },
        {
            "value": "홍콩항공",
            "airlineCode": "HX"
        },
        {
            "value": "홍콩익스프레스",
            "airlineCode": "UO"
        },
        {
            "value": "루프트한자 독일항공",
            "airlineCode": "LH"
        },
        {
            "value": "미얀마항공",
            "airlineCode": "UB"
        },
        {
            "value": "로얄브루나이항공",
            "airlineCode": "BI"
        },
        {
            "value": "사천항공",
            "airlineCode": "3U"
        },
        {
            "value": "에어재팬",
            "airlineCode": "NQ"
        },
        {
            "value": "미얀마국제항공",
            "airlineCode": "8M"
        },
        {
            "value": "춘추항공",
            "airlineCode": "9C"
        },
        {
            "value": "폴란드항공",
            "airlineCode": "LO"
        },
        {
            "value": "오만항공",
            "airlineCode": "WY"
        },
        {
            "value": "아틀라스항공",
            "airlineCode": "5Y"
        }
    ]







    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className='w-72 h-18 flex flex-col justify-self-center'>
                    <P>등록된 항공편이 아직 없어요!</P>
                    <P>항공권 추가</P>
                </Button>
            </DialogTrigger>
            <DialogContent>

                {/* 헤더 */}
                <DialogHeader>
                    <DialogTitle>
                        <P variant='mainHeader'>항공편 등록</P>
                    </DialogTitle>
                    <DialogDescription>
                        <P>여정에 대한 항공편을 추가해주세요.</P>
                    </DialogDescription>
                </DialogHeader>



                {/* 항공기 출발 날짜 캘린더 */}
                < Popover open={openCalander} onOpenChange={setOpenCalander} >
                    <Label htmlFor="calender" className="text-left">
                        날짜
                    </Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !flightDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {flightDate ? format(flightDate, "yyyy년 M월 d일") : <span>출발 날짜를 입력해주세요.</span>}
                        </Button>
                    </PopoverTrigger><PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={flightDate}
                            onSelect={(currentValue) => {
                                setFlightDate(currentValue)
                                setOpenCalander(false)
                            }}
                            initialFocus />
                    </PopoverContent>
                </Popover >


                {/* 항공사 선택 리스트 */}
                <Popover open={openAirlineList} onOpenChange={setOpenAirlineList}>
                    <Label htmlFor="calender" className="text-left">
                        항공사
                    </Label>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openAirlineList}
                            className="w-[200px] justify-between"
                        >
                            {myAirline
                                ? airlines.find((airline) => airline.value === myAirline)?.value
                                : "항공사를 선택해주세요."}
                            {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="한글명으로 검색" />
                            <CommandList>
                                <CommandEmpty>일치하는 항공사가 없습니다.</CommandEmpty>
                                <CommandGroup>
                                    {airlines.map((airline) => (
                                        <CommandItem
                                            key={airline.value}
                                            value={airline.value}
                                            onSelect={(currentValue) => {
                                                setMyAirline(currentValue === airline ? "" : currentValue)
                                                setMyAirlineCode(airline.airlineCode)
                                                setOpenAirlineList(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    myAirline.value === airline.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {airline.value}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>

                {/* 편명 */}
                <Label htmlFor="flightnumber">편명</Label>
                <Input
                    type="flightnumber"
                    placeholder="알파벳 뒤 세자리 또는 네자리 숫자를 입력하세요."
                    onChange={handleFlightNumberChange}>
                </Input>


                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button
                            type="submit"
                            onClick={() => {
                                dispath(addFlight())
                                console.log(`${myAirlineCode}${flightNumber}`)
                            }}
                        >등록
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button type="cancel">취소</Button>
                    </DialogClose>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}

export default FlightDialog;

