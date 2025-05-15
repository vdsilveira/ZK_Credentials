fn main(emission: u32, today: pub u32) {
    let five_years: u32 = 50000;
    let validate: u32 = emission + five_years;

    assert(validate >= today);
}

