import { Button } from "@/components/atoms/Button";
import { P } from "@/components/atoms/P";
import { format } from "date-fns";
import { useState } from "react";
import { Calendar as CalendarIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/atoms/label";
import { Input } from "@/components/atoms/input";
import { Calendar } from "@/components/atoms/calendar";
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



function FlightDialog() {

    const [flightDate, setFlightDate] = useState();
    const [openCalander, setOpenCalander] = useState(false);

    const [openAirlineList, setOpenAirlineList] = useState(false)
    const [airlineValue, setAirlineValue] = useState("");

    const [flightNumber, setFlightNumber] = useState("");

    const handleFlightNumberChange = (e) => {
        setFlightNumber(e.target.value);
    };


    // 예시 코드 모음집
    const airlines = [
        {
            value: "대한항공",
            label: "대한항공",
            airlineCode: "KE",

        },
        {
            value: "아시아나항공",
            label: "아시아나항공",
            airlineCode: "OZ",

        },
        {
            value: "티웨이항공",
            label: "티웨이항공",
            airlineCode: "TW",
        },
        {
            value: "진에어",
            label: "진에어",
            airlineCode: "LJ",
        },
        {
            value: "제주항공",
            label: "제주항공",
            airlineCode: "7C",
        },
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
                            aria-expended={openCalander}
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
                            {airlineValue
                                ? airlines.find((airline) => airline.value === airlineValue)?.label
                                : "항공사를 선택해주세요."}
                            {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="코드 또는 한글명으로 검색" />
                            <CommandList>
                                <CommandEmpty>일치하는 항공사가 없습니다.</CommandEmpty>
                                <CommandGroup>
                                    {airlines.map((airline) => (
                                        <CommandItem
                                            key={airline.value}
                                            value={airline.value}
                                            onSelect={(currentValue) => {
                                                setAirlineValue(currentValue === airline ? "" : currentValue)
                                                setOpenAirlineList(false)
                                            }}
                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    airlineValue === airline.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {airline.label}
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
                                console.log(flightDate)
                                console.log(airlineValue)
                                console.log(flightNumber)
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

