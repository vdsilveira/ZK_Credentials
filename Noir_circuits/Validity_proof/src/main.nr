fn main(emission: u32, today: pub u32) {
    let five_years: u32 = 50000;
    let validate: u32 = emission + five_years;

    assert(validate >= today);
}

#[test]
fn test_main() {
    main(20230917,20250515);
}

#[test(should_fail)]
fn test_fail_main() {
    main(20170917,20250515);
}